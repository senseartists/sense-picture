<template>
    <main>
        <Header :account="account" @connect="onConnect" @disconnect="loadDisconnectedPicture()" />
        <Picture id="picture" :apple-music="appleMusic" :deezer="deezer" :spotify="spotify" :connected="account!==null&&account!==undefined" :image="image" :top3="top3" :playlists="playlists" />
        <Footer :connected="account!==null&&account!==undefined"></Footer>
    </main>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
    name: "IndexPage"
});
</script>

<script>
import Vue from 'vue'

export default Vue.extend({
    name: "IndexPage",
    data: function() {
        return {
            spotify: this.spotify,
            account: this.account,
            deezer: this.deezer,
            appleMusic: this.appleMusic,
            image: this.image,
            top3: this.top3,
            playlists: this.playlists
        };
    },
    mounted() {
        this.playlists = [];
        for (let i = 0; i < 9; i++) {
            this.playlists.push(require("../assets/images/playlists/"+i+".jpg"));
        }
        this.loadDisconnectedPicture();
    },
    methods: {
        loadConnectedPicture(account) {
            this.account = account;
            this.spotify = "129k streams";
            this.appleMusic = "61.6k streams";
            this.deezer = "19.0k streams";
            this.image = require(`../assets/images/uc.jpg`);
            this.top3 = ["France", "USA", "Japan"];
            this.shuffle(this.playlists);
            this.playlists.reverse();
        },
        loadDisconnectedPicture() {
            this.account = null;
            this.spotify = "12.9M streams";
            this.appleMusic = "6.16M streams";
            this.deezer = "1.90M streams";
            this.image = require(`../assets/images/sense.jpg`);
            this.top3 = ["USA", "Japan", "France"];
            this.shuffle(this.playlists);
            this.playlists.reverse();
        },
        shuffle(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;
            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
        },
        onConnect(event) {
            this.loadConnectedPicture(event);
            this.$emit("notification", {text:"welcome back ✨",color:"#6d6"});
        }
    }
});
</script>

<style>
main {
    display: flex;
    flex-direction: column;
    height: 100vh;
}
#picture {
    min-height: 0;
    flex: 1;
}
</style>