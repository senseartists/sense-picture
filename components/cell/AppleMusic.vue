<template>
    <div class="apple-music cell">
        <h1>Apple</h1>
        <Transition mode="out-in" name="fade">
            <span :key="appleMusic">{{appleMusic}}</span>
        </Transition>
    </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
    name: "CellAppleMusic",
    props: ["appleMusic"]
});
</script>

<style>
.apple-music {
    background: linear-gradient(to bottom, #e97272, #dd5c5c);
    color: #fff;
    padding: 1.5rem 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.apple-music span {
    text-align: center;
    display: block;
}
</style>