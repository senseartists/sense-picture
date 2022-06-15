<template>
    <div class="deezer cell">
        <h1>Deezer</h1>
        <Transition mode="out-in" name="fade">
            <span :key="deezer">{{deezer}}</span>
        </Transition>
    </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
    name: "CellDeezer",
    props: ['deezer']
});
</script>

<style>
.deezer {
    background-color: #5ec6f2/*#46a0fd*/;
    color: #fff;
    padding: 1.5rem 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.deezer span {
    text-align: center;
    display: block;
}
</style>