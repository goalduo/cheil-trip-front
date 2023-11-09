<script setup></script>

<template>
  <section id="logo-section">
    <img id="earth-image" src="../assets/images/earth.svg" />
    <img id="point-image" src="../assets/images/point.svg" />

    <div id="sub-logo"></div>
  </section>

  <section id="intro-section">
    <span>설레는 여행의 시작, 제일여행과 함께 해요!</span>
    <span>제일여행의 서비스는 아래에서 확인할 수 있습니다.</span>
  </section>
</template>

<style scoped>
#logo-section {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
}

#intro-section {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  letter-spacing: 1px;
  color: var(--sky-color);
}

span:nth-child(1) {
  font-size: 50px;
  font-weight: 800;
}

span:nth-child(2) {
  font-size: 30px;
  font-weight: 800;
}

/* .cursor {
  position: absolute;
  z-index: 100;
}

#paperplane-image {
  width: 60px;
  transform: scaleX(-1);
} */

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

#earth-image {
  position: absolute;
  top: 90px;
  left: 100px;
  width: 200px;
  animation-name: rotate;
  animation-duration: 3s;
  animation-delay: 0;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

#point-image {
  position: absolute;
  top: 180px;
  right: 140px;
  width: 150px;
}

#sub-logo {
  width: 55%;
  height: 50vh;
  margin: 0 auto;
  align-self: center;
  background-image: url('../assets/images/sub-logo.svg');
  background-position: center;
}
</style>
