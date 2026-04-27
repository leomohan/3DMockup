import * as THREE from "three";

const BASE_BOOK_SIZE = {
  width: 1.4,
  height: 2.1,
  depth: 0.28
};

function createBook(materials) {
  const geometry = new THREE.BoxGeometry(
    BASE_BOOK_SIZE.width,
    BASE_BOOK_SIZE.height,
    BASE_BOOK_SIZE.depth
  );
  const mesh = new THREE.Mesh(geometry, materials);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function createDesk(width = 4.5, depth = 3.3) {
  const geometry = new THREE.PlaneGeometry(width, depth);
  const material = new THREE.MeshStandardMaterial({
    color: "#dfd4c6",
    roughness: 0.95,
    metalness: 0.02
  });
  const desk = new THREE.Mesh(geometry, material);
  desk.rotation.x = -Math.PI / 2;
  desk.position.y = -1.2;
  desk.receiveShadow = true;
  return desk;
}

export const MOCKUP_TEMPLATES = [
  {
    id: "standing",
    label: "Standing Book",
    description: "Front-facing upright mockup for clean promotional stills.",
    create(materials) {
      const group = new THREE.Group();
      const book = createBook(materials);
      book.rotation.y = -0.35;
      book.rotation.x = 0.05;
      group.add(book);
      return group;
    },
    setupCamera(camera) {
      camera.position.set(0, 0.3, 4.9);
    }
  },
  {
    id: "angled",
    label: "Angled Perspective",
    description: "More dynamic three-quarter composition for feeds and ads.",
    create(materials) {
      const group = new THREE.Group();
      const book = createBook(materials);
      book.rotation.set(-0.16, -0.7, 0.08);
      book.position.set(0.15, -0.04, 0);
      group.add(book);
      return group;
    },
    setupCamera(camera) {
      camera.position.set(0, 0.15, 4.3);
    }
  },
  {
    id: "stack",
    label: "Stack of Books",
    description: "Three stacked copies with the uploaded cover on the top book.",
    create(materials, pageMaterial) {
      const group = new THREE.Group();
      const dummyMaterials = [
        pageMaterial,
        pageMaterial,
        pageMaterial,
        pageMaterial,
        pageMaterial,
        pageMaterial
      ];

      const baseBook = createBook(dummyMaterials);
      baseBook.rotation.set(-Math.PI / 2, 0, -0.04);
      baseBook.position.set(-0.08, -0.88, -0.18);
      group.add(baseBook);

      const middleBook = createBook(dummyMaterials);
      middleBook.rotation.set(-Math.PI / 2, 0, 0.02);
      middleBook.position.set(0.04, -0.68, 0.02);
      group.add(middleBook);

      const heroBook = createBook(materials);
      heroBook.rotation.set(-Math.PI / 2, 0, 0.1);
      heroBook.position.set(0.18, -0.42, 0.3);
      group.add(heroBook);

      group.rotation.z = -0.1;
      return group;
    },
    setupCamera(camera) {
      camera.position.set(0.15, 0.3, 4.7);
    }
  },
  {
    id: "desk",
    label: "Book on Desk",
    description: "Minimal desk surface scene with a hero book and soft editorial lighting.",
    create(materials) {
      const group = new THREE.Group();
      const desk = createDesk();
      const book = createBook(materials);

      book.rotation.set(-0.95, -0.48, 0.58);
      book.position.set(0.25, -0.88, 0.05);

      group.add(desk);
      group.add(book);
      return group;
    },
    setupCamera(camera) {
      camera.position.set(0, 0.35, 5);
    }
  }
];
