import React, {useState, useEffect} from 'react';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

import css from './css/Home.module.scss'
import json from './mediaList.json'

const Home = () => {
  const [search, setSearch] = useState(''),
        [medias, setMedias] = useState(json)

  const mediasContent = medias.sort((a, b) => a.name.localeCompare(b.name)).filter(media =>
    search.length > 0 ? media.name.toLowerCase().includes(search) : media
    ).map((media, i) => {    
      return(
        pug`
          img(
            key=i
            src=media.src
            className=css.Home__Image
            title=media.name
            alt=media.name
          )
        `
      )
  }) 

  return (
    pug`
      .d-flex
        div(className=css.Home)
          nav(className=css.Home__Navbar).row.sticky-top
            .col-lg-8
            .col-lg-4(className=css.Home__NavbarRight)
              div(className=css.Home__NavbarSearch)
                input(
                  type="text"
                  name="search"
                  onChange=e=>setSearch(e.currentTarget.value)
                  className=css.Home__NavbarSearch_SearchBar)
                i(className=css.Home__NavbarSearch_SearchBar_Logo).fa.fa-search
              div(className=css.Home__NavbarMenu)
                i(className=css.Home__NavbarMenu_Icon).fa.fa-home
                i(className=css.Home__NavbarMenu_Icon).fa.fa-bell
                img(src="https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png" className=css.Home__NavbarMenu_Avatar)
          .col-12(className=css.Home__Content)
            .container-fluid(style={padding:"0"})
              div(className=css.Home).col-12
                if medias.filter(media => search.length > 0 ? media.name.toLowerCase().includes(search) : media).length > 0
                  ResponsiveMasonry(
                    columnsCountBreakPoints={350: 3, 750: 4, 900: 6}).row
                    Masonry(gutter="14px")
                      = mediasContent
                else
                  div(className=css.Home__Null_Content)
                    img(src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-2506.jpg?size=626&ext=jpg")
                    h1 No media found
    `
  )
}

export default Home;