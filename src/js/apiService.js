const KEY = "21828776-3a3234db6b008ce4834511463";
const URL = 'https://pixabay.com/api/';
const TUNING = 'image_type=photo&orientation=horizontal';


export default class ApiService {
    constructor() {
        this.page = 1;
        this.searchQuery = '';
    };

    requestOnUrl() {
        return fetch(`${URL}?${TUNING}&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${KEY}`).then(el => {
            this.increment();
             return el.json()}).catch(console.log);  
    }

    increment() {
           this.page += 1;
    }

    resetPage() {
        this.page = 1
    }
    
}