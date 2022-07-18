<template>
    <div class="dsp-cell cell">
        <h1>{{ title }}</h1>
        <Transition mode="out-in" name="fade">
            <span :key="streams">{{ streams }}</span>
        </Transition>
    </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
    props: ["streams", "title"]
});
</script>

<style>
.dsp-cell {
    color: #fff;
    padding: 1.5rem 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.dsp-cell span {
    text-align: center;
    display: block;
}
@media (orientation: portrait) {
    .dsp-cell {
        min-height: 8em;
    }
}
</style>