<template>
    <div class="top3 cell">
        <h1>Top 3</h1>
        <Transition v-for="(top,index) in top3" :key="top" mode="out-in" name="fade">
            <p :key="top">{{index+1}} {{top}}</p>
        </Transition>
    </div>
</template>

<script>
import Vue from 'vue';
export default Vue.extend({
    props: {
        top3: {type: Array, default: () => []}
    }
});
</script>

<style>
.top3 {
    background: #e2e2e2;
    color: #000;
    padding: 1em 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.top3 p {
    margin: 0 1em;
}
</style>