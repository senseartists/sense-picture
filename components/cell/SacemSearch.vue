<template>
    <div class="sacem-search-cell">
        <div class="query">
            <input class="black" v-model="query.title" @keyup="event=>event.keyCode==13&&this.search()" placeholder="title" />
            <input class="black" v-model="query.artist" @keyup="event=>event.keyCode==13&&this.search()" placeholder="name of the performer, creator" />
            <button class="black button" @click="search">Search</button>
        </div>
        <div class="results">
            <div v-for="result of results">
                <span class="title">{{ result.workTitle }}</span>
                <span v-if="result.workGenre.workGenreLabel">Genre: {{ result.workGenre.workGenreLabel }}</span>
                <span v-if="result.workDuration">Duration: {{ result.workDuration }} seconds</span>
                <span v-if="result.workISWCCode">ISWCCode: {{ result.workISWCCode }}</span>
                <span v-for="artist of result.workInterestedParties">
                    {{ artist.workInterestedPartyRoles.map(r=>r.workInterestedPartyRoleLabel).join(", ") }} :
                    {{ artist.workInterestedPartyCorporateName}} {{ artist.workInterestedPartyFirstName }} {{ artist.workInterestedPartyLastName }}
                </span>
            </div>
        </div>
        <div class="pagination" v-if="pagination">
            <div v-if="pagination.totalElements">
                <span>{{ pagination.totalElements }} results, page {{ pagination.currentPage }} of {{ pagination.maxPage }}</span>
                <button v-if="pagination.currentPage>1" @click="previousPage">previous</button>
                <button v-if="pagination.currentPage<pagination.maxPage" @click="nextPage">next</button>
            </div>
            <span v-else>no results</span>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
export default Vue.extend({
    data() {
        return {
            query: { title:"", artist:"", page:1 },
            results: [],
            pagination: null
        };
    },
    methods: {
        search(resetPage=true) {
            if (resetPage)
                this.query.page = 1;
            if (!this.query.title && !this.query.artist) return;
            axios.get(`api/sacem?artist=${encodeURIComponent(this.query.artist)}&title=${encodeURIComponent(this.query.title)}&page=${this.query.page}`)
            .then(res => {
                this.results = res.data.paginatedData;
                this.pagination = res.data.pagination;
            })
            .catch(error => {
                console.error(error);
                this.$emit("cannotSearch", {error});
            });
        },
        nextPage() {
            this.query.page++;
            this.search(false);
        },
        previousPage() {
            this.query.page--;
            this.search(false);
        }
    }
});
</script>

<style>
.sacem-search-cell {
    background-color: #fff;
    color: #000;
    padding: 1em;
    display: flex;
    flex-direction: column;
}
.sacem-search-cell > * {
    width: auto;
    max-width: 960px;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
}
.sacem-search-cell .query {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2em;
}
.sacem-search-cell .results > div {
    display: flex;
    flex-direction: column;
}
.sacem-search-cell .results > div {
    background-color: #e2e2e2;
    padding: .5em;
    margin: .5em;
    border-radius: .5em;
    display: flex;
    flex-direction: column;
}
.sacem-search-cell .title {
    font-weight: bold;
    color: #32c7c7;
}
.sacem-search-cell .pagination {
    text-align: center;
}
</style>