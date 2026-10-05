<template>
  <div class="badge" aria-hidden="true">
    <svg viewBox="0 0 200 200" class="badge__ring">
      <defs>
        <path id="ring" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
      </defs>
      <circle cx="100" cy="100" r="96" class="badge__disc" />
      <text class="badge__text">
        <textPath href="#ring" startOffset="0">
          OPEN TO ROLES ✱ BACKEND ✱ AI INFRA ✱ DEVOPS ✱
        </textPath>
      </text>
    </svg>
    <span class="badge__core">↘</span>
  </div>
</template>

<style scoped>
.badge {
  position: relative;
  width: 132px;
  height: 132px;
  filter: drop-shadow(4px 4px 0 var(--shadow));
}
.badge__ring {
  width: 100%;
  height: 100%;
  animation: spin 22s linear infinite;
}
.badge__disc {
  fill: var(--green);
  stroke: var(--line);
  stroke-width: 5;
}
.badge__text {
  font-family: var(--font-mono);
  font-size: 15.5px;
  font-weight: 700;
  letter-spacing: 0.06em;
  fill: #121212;
}
.badge__core {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-size: 2rem;
  font-weight: 700;
  color: #121212;
}
</style>
