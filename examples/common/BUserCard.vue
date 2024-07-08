<template>
    <transVnode
        :name="config.name"
        :children="config.children"
        :inner-class="config.innerClass"
    />
</template>

<script>
import transVnode from './transVnode.js';

export default {
    name: 'BUserCard',
    components: {transVnode},
    props: {
        show: {
            type: Boolean,
            require: true,
            default: false
        },
        config: {
            type: Object,
            require: true,
            default: () => {}
        }
    }
};
</script>
