<template>
    <div class="submit cell">
        <TrackModal v-show="showTrackModal" @close="showTrackModal=false" :track="track" />
        <Transition mode="out-in" name="fade">
            <form key="2" v-if="connected" class="submit-form">
                <Transition mode="out-in" :name="transition">
                    <div class="step" v-if="step==1" :key="1">
                        <h1>submit new music</h1>
                        <input type="text" v-model="music.artist" placeholder="Artist" />
                        <input type="text" v-model="music.title" placeholder="Title" />
                        <button type="button" class="button" @click="next">next</button>
                    </div>
                    <div class="step" v-if="step==2" :key="2">
                        <img class="back-button" src="~/assets/images/svg/arrow.svg" alt="back" @click="previous" />
                        <h1>submit new music</h1>
                        <input type="text" v-model="music.upc" placeholder="UPC (we provide if needed)" />
                        <input type="text" v-model="music.label" placeholder="Label" />
                        <input type="text" v-model="music.catalogNumber" placeholder="Catalog Number" />
                        <input type="date" v-model="music.releaseDate" placeholder="Release Date" />
                        <button type="button" class="button" @click="next">next</button>
                    </div>
                    <div class="step" v-if="step==3" :key="3">
                        <img class="back-button" src="~/assets/images/svg/arrow.svg" alt="back" @click="previous" />
                        <h1>tracks</h1>
                        <div class="tracks">
                            <div class="track" v-for="track,index in music.tracks">
                                <span>{{index+1}}.</span>
                                <input type="text" v-model="track.name" placeholder="Track Name" />
                                <button type="button" class="more-button" @click="openTrackModal(track)" title="More">⋮</button>
                                <button type="button" class="delete-button" @click="deleteTrack(index)" title="Delete">-</button>
                            </div>
                        </div>
                        <button type="button" class="add-button" @click="addTrack()" title="Add">+</button>
                        <button type="button" class="button" @click="next">next</button>
                    </div>
                    <div class="step" v-if="step==4" :key="4">
                        <img class="back-button" src="~/assets/images/svg/arrow.svg" alt="back" @click="previous" />
                        <h1>submit new music</h1>
                        
                        <button type="button" class="button" @click="submitMusic">send</button>
                    </div>
                </Transition>
                <span class="step-count">{{step}} / 4</span>
            </form>
            <p key="1" v-else class="connect-to-submit">connect wallet to submit new music</p>
        </Transition>
    </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue'
export default Vue.extend({
    props: {
        connected: {type: Boolean, default: false}
    },
    data() {
        return {
            step: 1,
            transition: "slide",
            music: {
                artist: "",
                title: "",
                upc: "",
                label: "",
                catalogNumber: "",
                releaseDate: "",
                tracks: [{name: ""},{name: ""}]
            },
            showTrackModal: false,
            track: {}
        }
    },
    methods: {
        next() {
            if ((this.step==1) && (this.music.artist=="" || this.music.title=="")
                || (this.step==2 && (this.music.label=="" || this.music.catalogNumber=="" || this.music.releaseDate==""))
                || (this.step==3 && this.music.tracks.reduce((acc,track)=>acc||!track.name,false))) {
                return;
            }
            this.transition = "slide";
            this.step++;
        },
        previous() {
            this.transition = "slide-out";
            if (this.step > 1)
                this.step--;
        },
        submitMusic() {
            axios.post("api/music", this.music)
            .then(res => {
                this.$emit("submitMusic", {title:this.title});
                this.step = 1;
                this.music = { artist:"", title:"", upc:"", label:"", catalogNumber:"", releaseDate:"", tracks:[] };
            })
            .catch(error => {
                console.error(error);
                this.$emit("cannotSubmitMusic", {title:this.title});
            });
        },
        openTrackModal(track) {
            this.showTrackModal = true;
            this.track = track;
        },
        deleteTrack(index) {
            this.music.tracks.splice(index,1);
        },
        addTrack() {
            this.music.tracks.push({});
        }
    }
});
</script>

<style>
.submit {
    background: #303030;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1em 10%;
    overflow-x: hidden;
}
.submit-form {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    text-align: center;
}
.submit-form input {
    margin: .8em 0;
    width: 100%;
}
.submit-form .button {
    margin: 1em auto 0 auto;
}
.submit-form .step {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 100%;
    position: relative;
    margin-top: 1em;
}
.submit-form .back-button {
    position: absolute;
    top: 0;
    left: 0;
    width: 2em;
    cursor: pointer;
    filter: invert(1);
}
.submit-form .step-count {
    display: block;
    width: 100%;
    text-align: right;
}
.submit-form .tracks {
    max-height: 55%;
    overflow-y: auto;
    overflow-x: hidden;
}
.submit-form .track {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
}
.submit-form .more-button, .submit-form .delete-button, .submit-form .add-button {
    appearance: none;
    width: 2em;
    height: 2em;
    background: transparent;
    color: #fff;
    font-weight: bold;
    border: none;
    font-size: 0.8em;
}
.submit-form .more-button, .submit-form .delete-button {
    margin-top: 1em;
}
.submit-form .more-button {
    margin-left: .5em;
}
.submit-form .add-button {
    margin: 0.5em auto 0 auto;
}
</style>