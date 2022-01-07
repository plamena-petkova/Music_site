import { getAllAlbums } from '../api/data.js';
import {html} from '../lib.js';
import { getUserData } from '../util.js';


const catalogTemplate = (albums) => html` 
<section id="catalogPage">
<h1>All Albums</h1>
${albums.length == 0
? html`<p>No Albums in Catalog!</p>`
: html`${albums.map(albumCard)}`}
</section>`;

const albumCard = (album, userData) => html`
<div class="card-box">
<img src="./images/Lorde.jpg">
<div>
    <div class="text-center">
        <p class="name">Name: ${album.name}</p>
        <p class="artist">Artist: ${album.artist}</p>
        <p class="genre">Genre: ${album.genre}</p>
        <p class="price">Price: ${album.price}</p>
        <p class="date">Release Date: ${album.releaseDate}</p>
    </div>
    ${userData != null
    ? html `<div class="btn-group">
        <a href="/details/${album._id}" id="details">Details</a>
    </div>`
    : null}
</div>
</div>`;


export async function catalogPage(ctx) {
    const userData = await getUserData();


    const albums = await getAllAlbums();
    ctx.render(catalogTemplate(albums, userData));
}