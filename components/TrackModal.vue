<template>
    <div class="modal-overlay" @mousedown="$emit('close')">
        <div class="track-modal modal" @mousedown.stop>
            <button class="close" @click="$emit('close')">
                <img width="32px" class="close-img" src="~/assets/images/svg/arrow.svg" alt="close" @click="close" />
            </button>
            <div>Metadata : {{track.name}}</div>
            <div class="submetadata">
                <span v-for="field in trackFormat" :class="field.title?'title':'field'">
                    <div v-if="field.title">{{field.title}}</div>
                    <fieldset v-else :required="field.required">
                        <legend>{{field.name}}</legend>
                        <select v-if="field.type=='select'" v-model="track[field.var]">
                            <option v-for="option in field.options" :value="option">{{option}}</option>
                        </select>
                        <input v-else :type="field.type" v-model="track[field.var]" />
                    </fieldset>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
const trackFormat = [
    {title:"Main"},
    {name:"track name", var:"name", required:true, type:"text"},
    {name:"display artists", var:"displayArtists", required:true, type:"text"},
    {name:"ISRC", var:"isrc", type:"text"},
    {name:"type", var:"type", type:"select", options:["track","classical track","music video","ringtone"]},
    {name:"volume", var:"volume", type:"number"},
    {name:"recording year", var:"year", type:"number"},
    {title:"Asset copyright"},
    {name:"year", var:"assetYear", type:"number"},
    {name:"line", var:"assetLine", type:"text"},
    {title:"Genre"},
    {name:"genre", var:"genre", required:true, type:"text"},
    {name:"subgenre", var:"subgenre", type:"text"},
    {name:"alternate genre", var:"alternateGenre", type:"text"},
    {name:"alternate subgenre", var:"alternateSubgenre", type:"text"},
    {title:"Lyrics"},
    {name:"lyrics", var:"lyrics", type:"textarea"},
    {title:"Playtime & preview"},
    {name:"playtime", var:"playtime", type:"number"},
    {name:"preview start", var:"previewStart", type:"number"},
    {name:"preview length", var:"previewLength", type:"number"},
    {title:"Language"},
    {name:"metadata language", var:"language", type:"select", options:["english","spanish","japanese","french","chinese","portuguese","other"]},
    {name:"explicit content", var:"explicit", type:"select", options:["not explicit","explicit","clean"]},
    {name:"audio language", var:"audioLanguage", type:"select", options:["instrumental","english","spanish","japanese","french","chinese","portuguese","other"]},
];

import Vue from 'vue'
export default Vue.extend({
    created () {
        this.trackFormat = trackFormat;
    },
    props: {
        track: {type: Object, default: {}}
    },
    methods: {
        close() {
            this.$emit("close");
        }
    }
});
</script>

<style>
.modal-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 200;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000000b0;
}

.modal {
    position: relative;
    text-align: center;
    background-color: white;
    color: black;
    height: 32em;
    width: 48em;
    max-width: 90%;
    max-height: 90%;
    padding: 64px 32px;
    border-radius: 16px;
    overflow-y: auto;
}
.modal > .close {
    appearance: none;
    position: absolute;
    top: 0;
    left: 0;
    margin: 16px;
    padding: 16px;
    border: none;
    background: none;
}
.modal > .close > img {
    width: 32px;
}

.track-modal .submetadata {
    display: flex;
    flex-wrap: wrap;
    font-size: .8em;
    text-align: left;
}
.track-modal .submetadata > .title {
    width: 100%;
}
.track-modal .submetadata > .field {
    flex: 1;
}
.track-modal fieldset {
    border: none;
    font-size: .8em;
}
.track-modal fieldset legend {
    color: #555;
}
.track-modal fieldset[required] legend:after {
    content: "*";
    color: red;
}
.track-modal input, .track-modal select {
    border-bottom-color: #bbb;
    min-width: 100%;
}
.track-modal input:focus, .track-modal select:focus {
    border-bottom-color: #000;
}
</style>