<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button />
        </ion-buttons>
        <ion-title>Lieux de culte</ion-title>
      </ion-toolbar>
    </ion-header>

    <div ref="mapEl" class="map" />

    <!-- Légende avec PNG -->
    <div class="legend">
      <div v-for="d in DIOCESES" :key="d.id" class="legend-item">
        <img :src="d.img" class="legend-pin" />
        <span>{{ d.label }}</span>
      </div>
    </div>

    <!-- Fiche POI -->
    <transition name="slide">
      <div v-if="poi" class="card">
        <div class="card-body">
          <!-- PNG du diocèse en miniature à la place de la barre colorée -->
          <img :src="getDioceseImg(poi.diocese)" class="card-pin" />
          <div class="info">
            <strong>{{ poi.name }}</strong>
            <span class="diocese-label">{{ getDioceseLabel(poi.diocese) }}</span>
            <span
              >{{ poi.adress }}<template v-if="poi.adress2 && poi.adress2 !== 'null'">, {{ poi.adress2 }}</template></span
            >
            <span>{{ poi.postcode }} {{ poi.city }}</span>
            <a v-if="poi.website && poi.website !== 'null'" :href="poi.website" target="_system">Visiter le site →</a>
          </div>
        </div>
        <button class="close" @click="poi = null">✕</button>
      </div>
    </transition>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle } from "@ionic/vue"
import maplibregl from "maplibre-gl"
import { Protocol } from "pmtiles"
import { layers, namedFlavor } from "@protomaps/basemaps"
import markerDiocese1 from "@/assets/img/layout/pin1.png"
import markerDiocese2 from "@/assets/img/layout/pin2.png"

const DIOCESES = [
  { id: "1", label: "Évêque Benoît de Pau", color: "#A88B2A", img: markerDiocese1, key: "m1" },
  { id: "2", label: "Évêque Philippe de la Charité-sur-Loire", color: "#6B4EA3", img: markerDiocese2, key: "m2" },
]

const getDioceseImg = (id) => DIOCESES.find((d) => d.id === String(id))?.img ?? markerDiocese1
const getDioceseLabel = (id) => DIOCESES.find((d) => d.id === String(id))?.label ?? ""

const mapEl = ref(null)
const poi = ref(null)

onMounted(async () => {
  maplibregl.addProtocol("pmtiles", new Protocol().tile)

  const map = new maplibregl.Map({
    container: mapEl.value,
    style: {
      version: 8,
      glyphs: "https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf",
      sprite: "https://protomaps.github.io/basemaps-assets/sprites/v4/light",
      sources: {
        pm: {
          type: "vector",
          url: "pmtiles://https://pub-a3414ad0b3f448e58648cf080ebd4e2d.r2.dev/europe_ouest.pmtiles",
          attribution: '<a href="https://protomaps.com">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>',
        },
      },
      layers: layers("pm", namedFlavor("light"), { lang: "fr" }),
    },
    center: [2.35, 48.85],
    zoom: 5,
    minZoom: 4,
    maxBounds: [
      [-8, 38],
      [12, 54],
    ],
    maxPitch: 0,
    pitchWithRotate: false,
  })

  map.addControl(new maplibregl.NavigationControl({ showCompass: false }))
  map.dragRotate.disable()
  map.touchZoomRotate.disableRotation()

  map.on("load", async () => {
    try {
      for (const d of DIOCESES) {
        const { data } = await map.loadImage(d.img)
        map.addImage(d.key, data, { pixelRatio: 2 })
      }

      const raw = await fetch("https://ecof-api-production.up.railway.app/api/map-data").then((r) => r.json())

      map.addSource("poi", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: raw.map((p) => ({
            type: "Feature",
            geometry: { type: "Point", coordinates: [+p.longitude, +p.latitude] },
            properties: { ...p, diocese: String(p.diocese) },
          })),
        },
      })

      map.addLayer({
        id: "poi-icons",
        type: "symbol",
        source: "poi",
        layout: {
          "icon-image": ["match", ["get", "diocese"], ...DIOCESES.flatMap((d) => [d.id, d.key]), "m1"],
          "icon-size": ["interpolate", ["linear"], ["zoom"], 4, 0.2, 14, 0.55],
          "icon-anchor": "bottom",
          "icon-allow-overlap": true,
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
          "text-offset": [0, 0.5],
          "text-anchor": "top",
          "text-optional": true,
        },
        paint: {
          "text-color": "#1a1a1a",
          "text-halo-color": "#fff",
          "text-halo-width": 1.5,
        },
      })

      let poiClicked = false

      map.on("click", "poi-icons", (e) => {
        poiClicked = true
        poi.value = e.features[0].properties
        map.flyTo({
          center: e.features[0].geometry.coordinates,
          zoom: Math.max(map.getZoom(), 12),
          duration: 500,
        })
      })

      map.on("click", () => {
        if (poiClicked) {
          poiClicked = false
          return
        }
        poi.value = null
      })
      map.on("mouseenter", "poi-icons", () => (map.getCanvas().style.cursor = "pointer"))
      map.on("mouseleave", "poi-icons", () => (map.getCanvas().style.cursor = ""))
    } catch (err) {
      console.error("❌ Erreur :", err)
    }
  })
})
</script>

<style scoped>
.map {
  position: absolute;
  inset: 0;
  top: calc(56px + var(--ion-safe-area-top, 0px));
}

/* ── Légende ── */
.legend {
  position: absolute;
  top: calc(56px + var(--ion-safe-area-top, 0px) + 12px);
  right: 12px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(6px);
  border-radius: 10px;
  padding: 8px 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: #374151;
  z-index: 10;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}
.legend-pin {
  width: 18px;
  height: 18px;
  object-fit: contain;
  flex-shrink: 0;
}

/* ── Carte POI ── */
.card {
  position: absolute;
  bottom: 24px;
  left: 16px;
  right: 16px;
  background: #fff;
  border-radius: 16px;
  padding: 14px 40px 14px 14px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.18);
  z-index: 10;
}

.card-body {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

/* PNG du diocèse en miniature dans la fiche */
.card-pin {
  width: 28px;
  height: 28px;
  object-fit: contain;
  flex-shrink: 0;
  margin-top: 2px;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 13px;
  color: #4b5563;
}
.diocese-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #9ca3af;
  margin-bottom: 2px;
}
.info strong {
  font-size: 15px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 2px;
  line-height: 1.3;
}
.info a {
  margin-top: 6px;
  color: #6b4ea3;
  font-weight: 600;
  text-decoration: none;
}

.close {
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
.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(16px);
  opacity: 0;
}
</style>
