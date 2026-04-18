<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Lieux de culte</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="map-content" :scroll-y="false">
      <div ref="mapContainer" class="map-container" :class="{ ready: mapReady }"></div>

      <!-- Légende -->
      <div class="legend">
        <div class="legend-item" v-for="d in DIOCESES" :key="d.id">
          <span class="legend-dot" :style="{ background: d.color }"></span>
          <span class="legend-label">{{ d.label }}</span>
        </div>
      </div>

      <!-- Bottom card -->
      <transition name="slide-up">
        <div v-if="selectedPoi" class="poi-card">
          <div class="poi-card-handle" @click="selectedPoi = null"></div>
          <div class="poi-card-body">
            <div class="poi-diocese-badge" :style="{ background: getDioceseColor(selectedPoi.diocese) }"></div>
            <div class="poi-info">
              <p class="poi-name">{{ selectedPoi.name }}</p>
              <p class="poi-address">
                {{ selectedPoi.adress }}<span v-if="selectedPoi.adress2">, {{ selectedPoi.adress2 }}</span>
              </p>
              <p class="poi-city">{{ selectedPoi.postcode }} {{ selectedPoi.city }}</p>
              <ion-button v-if="selectedPoi.website" :href="selectedPoi.website" target="_system" fill="outline" size="small" class="poi-website-btn" @click.stop> Visiter le site </ion-button>
            </div>
          </div>
          <button class="poi-close" @click="selectedPoi = null" aria-label="Fermer">✕</button>
        </div>
      </transition>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from "vue"
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, onIonViewWillEnter } from "@ionic/vue"
import maplibregl from "maplibre-gl"
import { layers, namedFlavor } from "@protomaps/basemaps"

// ─── Config fonds de carte ───────────────────────────────────────────────────
function buildStyle() {
  return {
    version: 8,
    glyphs: "https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf",
    sprite: "https://protomaps.github.io/basemaps-assets/sprites/v4/light",
    sources: {
      protomaps: {
        type: "vector",
        url: "https://tiles.ecof.app/europe_ouest.json",
        attribution: '<a href="https://protomaps.com">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>',
      },
    },
    layers: layers("protomaps", namedFlavor("light"), { lang: "fr" }),
  }
}

// ─── Config diocèses ────────────────────────────────────────────────────────
const DIOCESES = [
  { id: "1", label: "Évêque Benoît de Pau", color: "#A88B2A" },
  { id: "2", label: "Évêque Philippe de la Charité-sur-Loire", color: "#6B4EA3" },
]

const getDioceseColor = (id) => DIOCESES.find((d) => d.id === String(id))?.color ?? "#9ca3af"

// ─── Map state ───────────────────────────────────────────────────────────────
const mapContainer = ref(null)
const mapReady = ref(false)
const selectedPoi = ref(null)
let map = null

// ─── Chargement API ──────────────────────────────────────────────────────────
async function loadPoi() {
  const res = await fetch("https://ecof-api-production.up.railway.app/api/map-data")
  if (!res.ok) throw new Error("Erreur API")
  return res.json()
}

// ─── Couche POI ──────────────────────────────────────────────────────────────
function addPoiLayer(poi) {
  const geojson = {
    type: "FeatureCollection",
    features: poi.map(({ name, adress, adress2, postcode, city, latitude, longitude, website, diocese }) => ({
      type: "Feature",
      geometry: { type: "Point", coordinates: [parseFloat(longitude), parseFloat(latitude)] },
      properties: { name, adress, adress2, postcode, city, website, diocese: String(diocese) },
    })),
  }

  map.addSource("poi", { type: "geojson", data: geojson })

  const dioceseColorExpression = ["match", ["get", "diocese"], ...DIOCESES.flatMap((d) => [d.id, d.color]), "#9ca3af"]

  map.addLayer({
    id: "poi-halos",
    type: "circle",
    source: "poi",
    paint: {
      "circle-radius": 11,
      "circle-color": dioceseColorExpression,
      "circle-opacity": 0.25,
    },
  })

  map.addLayer({
    id: "poi-circles",
    type: "circle",
    source: "poi",
    paint: {
      "circle-radius": ["interpolate", ["linear"], ["zoom"], 5, 6, 12, 9],
      "circle-color": dioceseColorExpression,
      "circle-stroke-width": 2,
      "circle-stroke-color": "#ffffff",
    },
  })

  map.addLayer({
    id: "poi-labels",
    type: "symbol",
    source: "poi",
    minzoom: 10,
    layout: {
      "text-field": ["get", "name"],
      "text-font": ["Noto Sans Regular"],
      "text-size": 11,
      "text-offset": [0, 1.4],
      "text-anchor": "top",
      "text-max-width": 12,
    },
    paint: {
      "text-color": "#1a1a1a",
      "text-halo-color": "#ffffff",
      "text-halo-width": 1.5,
    },
  })

  map.on("click", "poi-circles", (e) => {
    selectedPoi.value = { ...e.features[0].properties }
    map.flyTo({
      center: e.features[0].geometry.coordinates,
      zoom: Math.max(map.getZoom(), 12),
      duration: 600,
    })
  })

  map.on("click", (e) => {
    const features = map.queryRenderedFeatures(e.point, { layers: ["poi-circles"] })
    if (!features.length) selectedPoi.value = null
  })

  map.on("mouseenter", "poi-circles", () => (map.getCanvas().style.cursor = "pointer"))
  map.on("mouseleave", "poi-circles", () => (map.getCanvas().style.cursor = ""))
}

// ─── Init carte ──────────────────────────────────────────────────────────────
onIonViewWillEnter(() => {
  if (map) {
    map.resize()
    return
  }

  map = new maplibregl.Map({
    container: mapContainer.value,
    style: buildStyle(),
    center: [2.35, 48.85],
    zoom: 5,
    minZoom: 4,
    maxBounds: [
      [-8, 38],
      [12, 54],
    ],
    pitchWithRotate: false,
    maxPitch: 0,
  })

  map.addControl(new maplibregl.NavigationControl({ showCompass: false }))
  map.dragRotate.disable()
  map.touchZoomRotate.disableRotation()

  map.on("load", async () => {
    map.resize()
    try {
      const poi = await loadPoi()
      addPoiLayer(poi)
    } catch (e) {
      console.error("Erreur chargement POI:", e)
    }
    requestAnimationFrame(() => {
      mapReady.value = true
    })
  })
})
</script>

<style scoped>
.map-content {
  --padding-start: 0;
  --padding-end: 0;
  --padding-top: 0;
  --padding-bottom: 0;
}

.map-container {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.map-container.ready {
  opacity: 1;
}

ion-content::part(scroll) {
  height: 100%;
}

/* ── Légende ── */
.legend {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(6px);
  border-radius: 10px;
  padding: 8px 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  gap: 6px;
  z-index: 50;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}
.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  flex-shrink: 0;
}
.legend-label {
  font-size: 12px;
  font-weight: 500;
  color: #374151;
}

/* ── Carte POI ── */
.poi-card {
  position: absolute;
  bottom: 24px;
  left: 16px;
  right: 16px;
  background: white;
  border-radius: 16px;
  padding: 12px 16px 20px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.18);
  z-index: 100;
}

.poi-card-handle {
  width: 36px;
  height: 4px;
  background: #e0e0e0;
  border-radius: 2px;
  margin: 0 auto 14px;
  cursor: pointer;
}

.poi-card-body {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.poi-diocese-badge {
  width: 6px;
  flex-shrink: 0;
  align-self: stretch;
  border-radius: 3px;
  min-height: 40px;
}

.poi-info {
  flex: 1;
}

.poi-name {
  margin: 0 0 4px;
  font-size: 15px;
  font-weight: 700;
  color: #111827;
  line-height: 1.3;
}
.poi-address {
  margin: 0;
  font-size: 13px;
  color: #4b5563;
}
.poi-city {
  margin: 0 0 4px;
  font-size: 13px;
  color: #4b5563;
}
.poi-diocese-label {
  margin: 4px 0;
  font-size: 11px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.poi-website-btn {
  --color: #374151;
  --border-color: #d1d5db;
  --background-hover: #f9fafb;
}

.poi-close {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #f3f4f6;
  border: none;
  border-radius: 50%;
  width: 26px;
  height: 26px;
  font-size: 12px;
  color: #6b7280;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── Animation ── */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
