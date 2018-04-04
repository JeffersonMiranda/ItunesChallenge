<template>
    
 <div>
     
     <div class="row justify-content-center" id="search_bar">
         <div class="col-6">
             <input v-model="albumSearch" type="text" class="form-control" placeholder="Search by album name">             
         </div>
         <div class="col-1">
             <button class="btn btn-light" @click="SearchByAlbumName()">Go</button>          
         </div>
    </div>

            <div class="row justify-content-between">
                <div class="col-3 offset-2">
                  <h3 class="albums_header">Albums</h3>  
                </div>
                <div class="col-5">
                    <a :style="{visibility:cancelSearchVisibility}" class="cancelSearch" href="#" @click.prevent="CancelSearch()"> Cancel search </a>
                </div>
            </div>
      
        <div class="row justify-content-center">
            <div class="col-8">
                
                    <div class="d-flex justify-content-start flex-wrap" id="albums_container">
                    <album v-for="album in albumsPaginated" 
                            :key="album.id.attributes.id" 
                            :id-album="album.id.attributes['im:id']"
                            :album="album">
                        </album>    
                    
                    </div>

            </div>
        </div>

<div class="row justify-content-center container_pagination">
    <div class="col-md-2">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item"><a class="page-link" @click="previousAlbums()">Previous</a></li>
            <li class="page-item"><a class="page-link" @click="nextAlbums()">Next</a></li>
        </ul>
     </nav>
    </div>
</div>

</div>

</template>

<script>
import Album from "./Album";
import axios from "axios";

export default {
  components: {
    Album
  },
  data() {
    return {
      albums: [],
      range: 0,
      albumSearch: "",
      cancelSearchVisibility: "hidden",
      previousBtnVisibility: "visible",
      nextBtnVisibility: "visible"
    };
  },
  computed: {
    albumsPaginated() {
      return this.albums.slice(this.range, this.range + 8);
    }
  },
  methods: {
    getAlbums() {
      axios
        .get("https://itunes.apple.com/us/rss/topalbums/limit=100/json")
        .then(response => {
          this.albums = response.data.feed.entry;
        })
        .catch(error => {
          alert(error);
        });
    },
    hidePreviousBtn() {
      this.previousBtnVisibility = "hidden";
    },
    showPreviousBtn() {
      this.previousBtnVisibility = "visible";
    },
    hideNextBtn() {
      this.nextBtnVisibility = "hidden";
    },
    showNextBtn() {
      this.nextBtnVisibility = "visible";
    },
    nextAlbums() {
      if (this.albums.length - this.range > 8) {
        this.range += 8;
      }
    },
    previousAlbums() {
      if (this.range > 0) {
        this.range -= 8;
      }
    },
    SearchByAlbumName() {
      this.albums = this.albums.filter(alb => {
        return alb["im:name"].label.toLowerCase().includes(this.albumSearch);
      });
      this.cancelSearchVisibility = "visible";
    },
    CancelSearch() {
      this.getAlbums();
      this.albumSearch = "";
      this.cancelSearchVisibility = "hidden";
    }
  },
  created() {
    this.getAlbums();
  }
};
</script>

<style scoped>
#search_bar {
  margin-bottom: 30px;
}

.cancelSearch {
  font-size: 14px;
  text-align: right;
}

.albums_header {
  text-align: left;
  font-weight: bolder;
  padding-left: 5px;
}

#albums_container {
  padding-top: 10px;
  background-color: white;
}

.container_pagination {
  padding-top: 10px;
}
.container_pagination nav ul li a {
  border: none;
  background: transparent;
}
</style>
