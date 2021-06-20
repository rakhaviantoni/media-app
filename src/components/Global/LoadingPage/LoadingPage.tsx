import React from 'react';
import css from './css/LoadingPage.module.scss'


const LoadingPage = (props) => {
  return (
    pug`
      div(className=[css.LoadingPage, props.visibility].join(" "))
        div(className=css.LoadingPage__overlay)
        div(className=css.LoadingPage__container)
          div(className=css.LoadingPage__box)
            div(className=css.LoadingPage__spinner)
            div(className=css.LoadingPage__message) Please wait a moment...
    `
  )
}

export default LoadingPage;