document.addEventListener('DOMContentLoaded', () => {
    initThreeJS();
    initGSAP();
    initFormLogic();
});

function initThreeJS() {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    // Background is now white via CSS styles.css (body background)
    // Three.js background should be transparent or match white
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff); // White background

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Custom Shader for "Grainy" look - Updated for Light Theme
    // We need dark objects on light background.
    const vertexShader = `
        varying vec2 vUv;
        varying vec3 vNormal;
        void main() {
            vUv = uv;
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

    const fragmentShader = `
        varying vec2 vUv;
        varying vec3 vNormal;
        uniform float time;
        uniform vec3 color;
        
        // Simplex Noise (kept same)
        vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
        float snoise(vec2 v){
            const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                    -0.577350269189626, 0.024390243902439);
            vec2 i  = floor(v + dot(v, C.yy) );
            vec2 x0 = v -   i + dot(i, C.xx);
            vec2 i1;
            i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
            vec4 x12 = x0.xyxy + C.xxzz;
            x12.xy -= i1;
            i = mod(i, 289.0);
            vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                + i.x + vec3(0.0, i1.x, 1.0 ));
            vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
            m = m*m ;
            m = m*m ;
            vec3 x = 2.0 * fract(p * C.www) - 1.0;
            vec3 h = abs(x) - 0.5;
            vec3 ox = floor(x + 0.5);
            vec3 a0 = x - ox;
            m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
            vec3 g;
            g.x  = a0.x  * x0.x  + h.x  * x0.y;
            g.yz = a0.yz * x12.xz + h.yz * x12.yw;
            return 130.0 * dot(m, g);
        }

        void main() {
            vec3 lightDir = normalize(vec3(1.0, 1.0, 2.0));
            float diff = max(dot(vNormal, lightDir), 0.0);
            
            // Noise setup
            float noiseVal = snoise(vUv * 8.0 + time * 0.1);
            
            // Color Logic for Light Theme
            // Base color with some shadow
            vec3 finalColor = color * (diff * 0.6 + 0.4);
            
            // Apply noise as 'dirt' or texture
            finalColor -= noiseVal * 0.1; 
            
            gl_FragColor = vec4(finalColor, 1.0);
        }
    `;

    // Objects - Use Dark Blue/Grey
    const geometry = new THREE.IcosahedronGeometry(1.8, 1);
    const material = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 },
            color: { value: new THREE.Color('#2b5a9e') } // Professional Blue
        },
        vertexShader,
        fragmentShader,
        wireframe: false // Solid object looks better on white here
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Secondary object - Wireframe Torus
    const torusGeo = new THREE.TorusKnotGeometry(1.2, 0.4, 100, 16);
    const torusMat = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 },
            color: { value: new THREE.Color('#1a3c6e') } // Darker Blue
        },
        vertexShader,
        fragmentShader,
        wireframe: true // Wireframe gives technical look
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.position.set(-3, -2, -2);
    torus.rotation.set(0.5, 0.5, 0);
    scene.add(torus);

    // Animation Loop
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        const time = clock.getElapsedTime();

        material.uniforms.time.value = time;
        torusMat.uniforms.time.value = time;

        mesh.rotation.y = time * 0.1;
        mesh.rotation.z = time * 0.05;

        torus.rotation.x = time * 0.15;

        // Floating
        mesh.position.y = Math.sin(time * 0.5) * 0.1;

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Mouse Interaction
    document.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;

        gsap.to(mesh.rotation, {
            x: mouseY * 0.3,
            duration: 2
        });
        gsap.to(scene.rotation, {
            y: mouseX * 0.1,
            duration: 2
        });
    });
}

function initGSAP() {
    gsap.registerPlugin(ScrollTrigger);

    // Header reveal
    gsap.from('.site-header', { y: -100, opacity: 0, duration: 1, ease: 'power3.out' });

    // Text & Cards
    const elements = document.querySelectorAll('.fade-in, .reveal-text, .reveal-card, .reveal-item, .reveal-image, .reveal-up');

    elements.forEach(el => {
        gsap.fromTo(el,
            { y: 30, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out"
            }
        );
    });
}

function initFormLogic() {
    // Handle "Select Plan" buttons
    const planButtons = document.querySelectorAll('.select-plan');
    const formSection = document.getElementById('contact');
    const planInput = document.getElementById('plan');

    planButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const planType = btn.getAttribute('data-plan');

            // Set input value
            if (planInput) {
                planInput.value = planType === 'premium' ? 'Premium (₾450)' : 'Standard (₾250)';
            }

            // Scroll to form
            formSection.scrollIntoView({ behavior: 'smooth' });

            // Highlight input (optional UX)
            setTimeout(() => {
                planInput.focus();
            }, 800);
        });
    });
}
