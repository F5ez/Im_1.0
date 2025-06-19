import * as THREE from "three";

document.addEventListener("DOMContentLoaded", () => {
    // 1. Сцена и объект
    const scene = new THREE.Scene();
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: "#0000FF" });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0, -2);
    cube.rotation.set(0, Math.PI / 4, 0);
    scene.add(cube);

    // 2. Камера
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 0, 5);

    // 3. Рендерер
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = "absolute";

    // 4. Видео с камеры
    const video = document.createElement("video");
    video.style.position = "absolute";
    video.setAttribute("autoplay", true);
    video.setAttribute("muted", true);
    video.setAttribute("playsinline", true);

    navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
            video.play();
        })
        .catch((err) => console.error("getUserMedia error:", err));

    // 5. Добавляем в DOM: сначала видео, потом канвас
    document.body.appendChild(video);
    document.body.appendChild(renderer.domElement);

    // 6. Анимация
    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }

    animate();
});
