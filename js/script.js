'use strict';

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  console.log('clickedElement:', clickedElement);
  console.log('clickedElement (with plus): ' + clickedElement);

  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts .post.active');

  for(let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */

  const chosenArticleID = clickedElement.getAttribute('href');
  console.log(chosenArticleID);

  /* find the correct article using the selector (value of 'href' attribute) */

  const chosenArticle = document.querySelector(chosenArticleID);

  /* add class 'active' to the correct article */

  chosenArticle.classList.add('active');
}


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks() {

  console.log('Links have been generated!');

  /* cancel content of the left sidebar */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* find and save article's id */

  const articles = document.querySelectorAll(optArticleSelector);
  let html = '';
  for(let article of articles) {
    const articleID = article.getAttribute('id');

    /* find and save article's title */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* genearte and save link's HTML */

    const linkHTML = '<li><a href="#' + articleID + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

        
    /* place link's HTML in the left sidebar */

    titleList.insertAdjacentHTML("beforeend", linkHTML);

    /* insert link into html variable */

    html = html + linkHTML

    console.log(html);

  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

}

generateTitleLinks();

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll('article');

  /* START LOOP: for every article: */

  for (let article of articles) {

    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */

    let html = '';

    /* get tags from data-tags attribute */

    let articleTags = article.getAttribute('data-tags');
    console.log(articleTags);

    /* split tags into array */
    let tagsArray = articleTags.split(' ');
    console.log(tagsArray);

    /* START LOOP: for each tag */

    for (let tag of tagsArray) {
      console.log(tag);
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      console.log(linkHTML);

      /* add generated code to html variable */

      html = html + linkHTML;

      /* END LOOP: for each tag */
    
    }

    /* insert HTML of all the links into the tags wrapper */

    tagsWrapper.innerHTML = html;
    console.log(tagsWrapper);

  /* END LOOP: for every article: */
  }
}

generateTags();


