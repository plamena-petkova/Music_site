import {html} from '../lib.js';
import { search } from '../api/data.js';

const searchTemplate = (albums, onSearch, query) => html`        
<section id="searchPage">
<h1>Search by Name</h1>
<div class="search">
    <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name" >
    <button @click=${onSearch} class="button-list">Search</button>
</div>
<h2>Results:</h2>
<!--Show after click Search button-->
<div class="search-result">
   ${albums.length == 0 
            ? html`<p class="no-cars"> No results.</p>`
            : html`${albums.map(albumCardSearch)}`}
        </div>
    </div>

    <!--If there are no matches-->
    <p class="no-result">No result.</p>
</div>
</section>`;

const albumCardSearch = (album) => html`
 <div class="card-box">
        <img src="./images/BrandiCarlile.png">
        <div>
            <div class="text-center">
                <p class="name">Name: ${album.name}</p>
                <p class="artist">Artist: ${album.artist}</p>
                <p class="genre">Genre: ${album.genre}</p>
                <p class="price">Price: ${album.price}</p>
                <p class="date">Release Date: ${album.releaseDate}</p>
            </div>
            <div class="btn-group">
                <a href="/details/${album._id}" id="details">Details</a>
            </div>`;


export async function searchPage(ctx) {


    const searchAlbum = ctx.querystring.split('=')[1];
    console.log(ctx);

    const albums = await search(searchAlbum);

    ctx.render(searchTemplate(albums, onSearch, search));
   

    function onSearch() {
        
        const query = document.getElementById('search-input').value;
        ctx.page.redirect('/search?query=' + query);
    }

}