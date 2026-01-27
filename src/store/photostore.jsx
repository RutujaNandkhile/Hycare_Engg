const PHOTO_STORAGE_KEY = "photos";

const getPhotos = () => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(PHOTO_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const savePhotos = (photos) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(PHOTO_STORAGE_KEY, JSON.stringify(photos));
};

const photoStore = {
  photos: getPhotos(),
  subscribers: [],

  notify() {
    this.subscribers.forEach((cb) => cb([...this.photos]));
  },

  subscribe(cb) {
    this.subscribers.push(cb);
    cb([...this.photos]); // immediately send current photos
    return () => {
      this.subscribers = this.subscribers.filter((s) => s !== cb);
    };
  },

  add(photo) {
    this.photos.push(photo);
    savePhotos(this.photos);
    this.notify();
  },

  update(id, updatedPhoto) {
    this.photos = this.photos.map((p) => (p.id === id ? updatedPhoto : p));
    savePhotos(this.photos);
    this.notify();
  },

  delete(id) {
    this.photos = this.photos.filter((p) => p.id !== id);
    savePhotos(this.photos);
    this.notify();
  },
};

export default photoStore;
