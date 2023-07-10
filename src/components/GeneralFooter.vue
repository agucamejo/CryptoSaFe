<template>
    <footer>
        <div :id="'logos-container'">
            <img :class="'logos-footer'" src="./icons/github-icon.svg" alt="Logo GitHub">
            <img :class="'logos-footer'" src="./icons/linkedin-icon.svg" alt="Logo LinkedIn">
        </div>
        <p :style="'font-size:11px '">Copyright © 2023 - Agustin Camejo</p>
    </footer>
</template>

<style>
footer{
    border-top: 1.2px solid #8c8c8c;
    width: 75%;
    position: absolute;
    bottom:0;
    padding: 0.44rem 0rem 0rem 0rem;
    text-align: center;
}

#logos-container{
    display: flex;
    justify-content: center;
}

.logos-footer{
    padding: 0px 8px;
}

</style>