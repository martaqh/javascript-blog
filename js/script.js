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
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = '') {

  console.log('Links have been generated!');
  console.log(customSelector);

  /* cancel content of the left sidebar */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* find and save article's id */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log(articles);
  let html = '';
  for(let article of articles) {
    const articleID = article.getAttribute('id');

    /* find and save article's title */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* genearte and save link's HTML */

    const linkHTML = '<li><a href="#' + articleID + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

        
    /* place link's HTML in the left sidebar */

    titleList.insertAdjacentHTML('beforeend', linkHTML);

    /* insert link into html variable */

    html = html + linkHTML;
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


function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');
  console.log(tag);

  /* find all tag links with class active */

  let activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(activeTagLinks);

  /* START LOOP: for each active tag link */

  for (let activeTagLink of activeTagLinks) {
    
    /* remove class active */
    
    activeTagLink.classList.remove('active');

  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */

  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(tagLinks);

  /* START LOOP: for each found tag link */

  for (let tagLink of tagLinks) {

    /* add class active */

    tagLink.classList.add('active');

  /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */

  const linksToTags = document.querySelectorAll('.list a');

  /* START LOOP: for each link */

  for (let linkToTag of linksToTags) {

    /* add tagClickHandler as event listener for that link */

    linkToTag.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
  }
}

addClickListenersToTags();


function generateAuthors(){
  /* find all articles */
  const articles = document.querySelectorAll('article');

  /* START LOOP: for every article: */

  for (let article of articles) {

    /* find author wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);

    /* get author from data-tags attribute */

    let author = article.getAttribute('data-author');
    console.log(author);

    /* WRÓCIĆ DO KONSTRUKCJI JAK PRZY TAGACH generate HTML of the link */
    const linkHTML = '<li><a href="#author-' + author + '">' + author + '</a></li>';
    console.log(linkHTML);

    /* insert HTML of all the links into the tags wrapper */

    authorWrapper.innerHTML = linkHTML;
    console.log(authorWrapper);

  /* END LOOP: for every article: */
  }
  
}
generateAuthors();


function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');

  /* make a new constant "author" and extract author from the "href" constant */

  const author = href.replace('#author-', '');
  console.log(author);

  /* find all author links with class active */

  let activeAuthorLinks = document.querySelectorAll('a.active[href="#author-"]');
  console.log(activeAuthorLinks);

  /* START LOOP: for each active author link */

  for (let activeAuthorLink of activeAuthorLinks) {
    
    /* remove class active */
    
    activeAuthorLink.classList.remove('active');

  /* END LOOP: for each active author link */
  }

  /* find all author links with "href" attribute equal to the "href" constant */

  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(authorLinks);

  /* START LOOP: for each found author link */

  for (let authorLink of authorLinks) {

    /* add class active */

    authorLink.classList.add('active');

  /* END LOOP: for each found author link */
  }

  /* execute function "generateTitleLinks" with author selector as argument */

  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  /* find all links to authors */

  const linksToAuthors = document.querySelectorAll('.post-author a');

  /* START LOOP: for each link */

  for (let linkToAuthor of linksToAuthors) {

    /* add authorClickHandler as event listener for that link */

    linkToAuthor.addEventListener('click', authorClickHandler);

  /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();





