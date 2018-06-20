<template>
    <div class="amap-page-container">
        <el-amap vid="amapDemo" ref="amap" :center="center" :map-manager="amapManager" :zoom="zoom" :events="events" style="height: 300px;"></el-amap>
        <el-amap-search-box class="search-box" :on-search-result="onSearchResult"></el-amap-search-box>
        <div>
            {{ address }}
        </div>
    </div>
</template>

<script>
    import { AMapManager, } from 'vue-amap';
    export default {
        data() {
            let amapManager = new AMapManager();
            return {
                zoom: 12,
                center: [111.732177, 40.768553],
                amapManager,
                positionPicker: null,
                address: '',
                events: {
                    init: (map)=>{
                        AMapUI.loadUI(['misc/PositionPicker'], function(PositionPicker) {
                            this.positionPicker = new PositionPicker({
                                mode:'dragMarker',
                                map:map
                            });
                            this.positionPicker.on('success',(positionResult)=>{
                                console.log(positionResult.address);
                                this.address = positionResult.address;
                            })
                            this.positionPicker.start();
                        }.bind(this));
                    }
                }
            };
        },
        methods: {
            onSearchResult(pois) {
                if(pois.length){
                    this.center = [pois[0].lng,pois[0].lat];
                    this.positionPicker.start(new AMap.LngLat(pois[0].lng,pois[0].lat));
                }
            }
        },
        mounted() {
        }
    }
</script>

<style>
    .amap-demo {
        height: 300px;
    }
</style>
