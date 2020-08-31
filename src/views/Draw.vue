<template>
    <canvas id="drawer"></canvas>
</template>
<script>
    import drawerObject from "@/config/drawer";
    export default {
        name:'DrawerComponent',
        mounted(){
            drawerObject.init('drawer');
            // drawerObject.drawRect({x:0,y:0});
        },
    };
</script>
