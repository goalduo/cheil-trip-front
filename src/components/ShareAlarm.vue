<script setup></script>

<template>
    <!-- <div id="share-hide">
        <p>! 여행 공유 알람 !</p>
    </div> -->

    <div id="share-open">
        <p>!! 여행 공유 알람 !!</p>
        <ul class="alarm-list">
            <li class="alarm">
                민님으로부터 공유된 여행이 있습니다.
                <span>X</span>
            </li>
            <li class="alarm">
                수님으로부터 공유된 여행이 있습니다.
                <span>X</span>
            </li>
        </ul>
    </div>
</template>

<style scoped>
#share-hide {
    cursor: pointer;
    position: fixed;
    top: 100px;
    right: 30px;
    width: 300px;
    box-sizing: border-box;
    padding: 15px;
    background-color: var(--navheader-color);
    font-size: 14px;
    font-weight: 300;
    color: var(--red-color);
    text-align: center;
    border-radius: 10px;
    z-index: 10;
}

#share-open {
    position: fixed;
    top: 100px;
    right: 30px;
    width: 260px;
    box-sizing: border-box;
    padding: 15px;
    background-color: var(--navheader-color);
    font-size: 14px;
    font-weight: 200;
    text-align: center;
    border-radius: 10px;
    z-index: 10;
}

#share-open p {
    margin-bottom: 20px;
}

.alarm-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.alarm {
    cursor: pointer;
}

.alarm span {
    cursor: pointer;
    font-weight: 600;
    color: var(--tag-font-color)
}
</style>