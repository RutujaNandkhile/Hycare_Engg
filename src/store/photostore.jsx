const STORAGE_KEY = "PERMANENT_PHOTOS";

// Load from localStorage
const loadPhotos = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

// Save to localStorage
const savePhotos = (photos) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
};

// Subscribers
let listeners = [];

const notify = () => {
  listeners.forEach((cb) => cb([...photoStore.photos]));
};

const photoStore = {
  photos: loadPhotos(),

  subscribe(cb) {
    listeners.push(cb);
    cb([...this.photos]);

    return () => {
      listeners = listeners.filter((l) => l !== cb);
    };
  },

  add(photo) {
    this.photos = [...this.photos, photo];
    savePhotos(this.photos);
    notify();
  },

  update(id, updated) {
    this.photos = this.photos.map((p) =>
      p.id === id ? updated : p
    );
    savePhotos(this.photos);
    notify();
  },

  delete(id) {
    this.photos = this.photos.filter((p) => p.id !== id);
    savePhotos(this.photos);
    notify();
  },
};

export default photoStore;
