<template>
    <BUserCard
        v-if="showCard"
        :show="showCard"
        :config="combinedConfig"
    />
</template>

<script>
import {travelVirtual} from '../utils/index.js';
import BUserCard from '../common/BUserCard.vue';

export default {
    name: 'MiUserCard',
    components: {BUserCard},
    props: {
        cardConfig: {
            type: Object,
            default: () => {}
        },
        innerDataConf: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            dynamicData: {}
        };
    },
    computed: {
        showCard() {
            return this.dynamicData && Object.keys(this.dynamicData).length > 0;
        },
        combineData() {
            return this.showCard ? {...this.dynamicData, ...this.innerDataConf} : {};
        },
        combinedConfig() {
            if (!this.showCard) {
                return {};
            }
            return travelVirtual(this.cardConfig, this.combineData);
        }
    },
    created() {
        //  模拟
        setTimeout(() => {
            this.dynamicData = {
                username: '刘亦菲',
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJIoK74i8scmX8x2DBHnPuM6N-YyYdAzRmWQ&s'
            }
        })
    }
};
</script>

<style lang="scss">
@import 'BaseStyle/userCard.scss';
</style>
