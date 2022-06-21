<template>
    <header>
        <NuxtLink class="logo" to="/">
            <Logo />
        </NuxtLink>
        <div class="buttons">
            <button class="button" @click="connect()" v-if="account===null">
                <span class="underlined">connect<img src="~/assets/images/svg/send_music.svg" alt=""></span>
            </button>
            <button class="button" @click="disconnect()" v-else>
                {{account.substr(0,6)+"..."+account.substr(-4)}}
            </button>
            <div class="nft-select select" v-if="account!==null" @mouseover="showNFTs = true" @mouseleave="showNFTs = false">
                <button class="button">
                    {{selectedNft?selectedNft.name:"NFT"}}
                </button>
                <Transition name="fade">
                    <div class="options" :key="showNFTs" v-if="showNFTs">
                        <input type="text" v-model="nftSearch" placeholder="search for token name" />
                        <div v-for="nftsByCategorie,categorie,index,dummy in getNftsByCategories()">
                            <span class="categorie">{{categorie}} tokens ({{nftsByCategorie.length}})</span>
                            <button class="option nft" v-for="nft in nftsByCategorie" @click="selectNft(nft); showNFTs = false">
                                <span class="name">{{nft.name}}</span>
                                <span class="count">{{nft.count}}</span>
                            </button>
                        </div>
                    </div>
                </Transition>
            </div>
            <div class="select" v-if="account!==null" @mouseover="showPeriods = true" @mouseleave="showPeriods = false">
                <button class="button">
                    {{period.label || period.value || period}}
                </button>
                <Transition name="fade">
                    <div class="options" :key="showPeriods" v-if="showPeriods">
                        <button class="option" v-for="period in periods" @click="selectPeriod(period); showPeriods = false">
                            {{period.label || period.value || period}}
                        </button>
                    </div>
                </Transition>
            </div>
        </div>
    </header>
</template>

<script>
const periods = [
    {label:"last year", value:"year"},
    {label:"last month", value:"month"},
    {label:"last week", value:"week"},
    {label:"last day", value:"day"},
];
import Vue from 'vue';
import Web3 from 'web3';
export default Vue.extend({
    data() {
        return {
            nftSearch: "",
            period: periods[0],
            showNFTs: false,
            selectedNft: null,
            periods: periods,
            showPeriods: false
        }
    },
    props: {
        account: {
            type: String,
            default: null
        },
        nfts: {
            type: Array,
            default: ()=>[
                {name:"PolyDoge (PolyDoge)",count:"1 111 PolyDoge",categorie:"ERC-20"},
                {name:"\"Feelm\" Underground Canopy",count:"1",categorie:"ERC-721"},
                {name:"SENSE KEY (KEY)",count:"1 KEY",categorie:"ERC-721"}
            ]
        }
    },
    methods: {
        connect() {
            ethereum.request({method: "eth_requestAccounts"}).then((accounts) => {
                this.$emit("connect", ethereum.selectedAddress);
            });
        },
        disconnect() {
            this.$emit("disconnect");
        },
        changePeriod() {
            this.$emit("changePeriod", this.period);
        },
        selectNft(nft) {
            this.selectedNft = nft;
            this.$emit("selectNft", nft);
        },
        getNftsByCategories() {
            return this.nfts.filter((nft) => {
                let search = this.nftSearch.toLowerCase();
                return nft.categorie.toLowerCase().includes(search) || nft.name.toLowerCase().includes(search);
            }).reduce(function(acc,nft) {
                if(acc[nft.categorie])
                    acc[nft.categorie].push(nft);
                else acc[nft.categorie] = [nft];
                return acc;
            }, {});
        },
        selectPeriod(period) {
            this.period = period;
            this.$emit("selectPeriod", period);
        },
    }
});
</script>

<style>
header {
    width: 100%;
    /*position: fixed;*/
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    left: 0;
    z-index: 100;
    background: #1d1d1d;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1em 5%;
    color: #fff;
}
header > .logo {
    flex: 1;
}
header > .buttons {
    flex: 1;
    display: flex;
    flex-direction: row-reverse;
}
header > .buttons > * {
    margin-left: 0.75em;
}
.underlined {
    position: relative;
}
.underlined > img {
    position: absolute;
    top: 100%;
    left: 0;
}

.vue-simple-select-container .vue-simple-select-button {
    border-radius: 1em;
    border: solid 0.1em #ffffff;
    padding: 0.25em 1em;
    background-color: transparent;
    color: inherit;
    font-size: 1.25em;
    transition: color 0.3s ease, background-color 0.3s ease;
    cursor: pointer;
}

.select {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 16em;
    margin-bottom: -0.25em;
}
.select .options {
    position: absolute;
    top: 100%;
    left: 0;
    font-size: 1.25em;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #1d1d1d;
    border: solid .1em #ffffff;
    border-radius: 1em;
    padding: 0.25em .5em;
    max-height: 50vh;
    overflow-y: auto;
}
.select .categorie {
    display: block;
    background-color: rgba(100,100,100,0.5);
    border-radius: 1em;
    padding: 0 1em;
    margin-top: .5em;
    color: inherit;
    text-align: left;
    font-size: .75em;
}
.select .option {
    appearance: none;
    max-width: 100%;
    border: none;
    background-color: transparent;
    color: inherit;
    text-align: left;
    font-size: 1em;
    width: 100%;
    border-radius: .5em;
    transition: background-color 0.3s ease;
}
.select .option:hover {
    background-color: #ffffff88;
}
.nft .name {
    display: block;
    font-weight: bold;
    font-size: 0.9em;
    height: 1.25em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.nft .count {
    font-size: 0.75em;
}
.select > .options::-webkit-scrollbar-track {
    margin: 12px 0;
    border-radius: 4px;
}

@media(orientation: portrait) {
    header {
        flex-direction: column; /* TODO: temporaire ? */
        font-size: 0.75em;
    }
}
</style>