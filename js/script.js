'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  articleTag: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  articleAuthor: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorSidebarLink: Handlebars.compile(document.querySelector('#template-author-sidebar-link').innerHTML),
};



const opts = {
  tagSizes: {
    count: 5,
    classPrefix: 'tag-size-',
  },
};

const select = {
  all: {
    articles: '.post',
    
    linksTo: {
      tags: 'a[href^="#tag-"]',
      authors: 'a[href^="#author-"]',
    },
  },
  article: {
    tags: '.post-tags .list',
    author: '.post-author',
    title: '.post-title',
  },
  listOf: {
    titles: '.titles',
    tags: '.tags.list',
    authors: '.authors.list',
  },
};


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




function generateTitleLinks(customSelector = '') {

  console.log('Links have been generated!');
  console.log(customSelector);

  /* cancel content of the left sidebar */

  const titleList = document.querySelector(select.listOf.titles);
  titleList.innerHTML = '';

  /* find and save article's id */

  const articles = document.querySelectorAll(select.all.articles + customSelector);
  console.log(articles);
  let html = '';
  for(let article of articles) {
    const articleID = article.getAttribute('id');

    /* find and save article's title */

    const articleTitle = article.querySelector(select.article.title).innerHTML;

    /* save link's HTML data in an object and generate link html using a Handlebar template for article links */

    const linkHTMLData = {id: articleID, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
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


function calculateTagsParams(tags) {
  const params = {
    max: 0,
    min: 999999
  };

  for (let tag in tags) {
    if(tags[tag] > params.max){
      params.max = tags[tag];
      
    }

    if(tags[tag] < params.min){
      params.min = tags[tag];
      
    }
  }
  
  return params;

}



function calculateTagClass(count, params) {
  
  let classNumber = Math.floor( ( (count - params.min) / (params.max - params.min) ) * (opts.tagSizes.count - 1) + 1 );
  console.log(classNumber);
  return opts.tagSizes.classPrefix + classNumber;
}


function generateTags() {
  /* [NEW] create a new variable allTags with an empty object*/
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll('article');

  /* START LOOP: for every article: */

  for (let article of articles) {

    /* find tags wrapper */
    const tagsWrapper = article.querySelector(select.article.tags);

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
      /* save link's HTML data in an object and generate link html using a Handlebar template for tag links */
      const linkHTMLData = {tag: tag};
      const linkHTML = templates.articleTag(linkHTMLData);
      console.log(linkHTML);

      /* add generated code to html variable */

      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */

      if (!allTags.hasOwnProperty(tag)) { // eslint-disable-line

        /* [NEW] add generated code to allTags object */

        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

      /* END LOOP: for each tag */
    
    }

    /* insert HTML of all the links into the tags wrapper */

    tagsWrapper.innerHTML = html;
    console.log(tagsWrapper);

    /* END LOOP: for every article: */

  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(select.listOf.tags);

  const tagsParams = calculateTagsParams(allTags);
  console.log ('tagsParams:', tagsParams);


  /* [NEWER] create variable for object containing all tags data */

  const allTagsData = {tags: []};

  /* [NEW] START LOOP: for each tag in allTags */

  for (let tag in allTags) {
    /* [NEWER] push enlisted data to the object allTagsData */
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
    
  /* [NEW] END LOOP: for each tag in allTags */
  }

  /* [NEWER] add HTML to tagList using Handlebar template for tag cloud links */

  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log(allTagsData);

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

  const linksToTags = document.querySelectorAll(select.all.linksTo.tags);
  

  /* START LOOP: for each link */

  for (let linkToTag of linksToTags) {

    /* add tagClickHandler as event listener for that link */

    linkToTag.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
  }
}

addClickListenersToTags();


function generateAuthors(){
  /* [NEWER] create a new variable allAuthors with an empty object*/
  let allAuthors = {};
  
  /* find all articles */
  const articles = document.querySelectorAll('article');

  /* START LOOP: for every article: */

  for (let article of articles) {

    /* find author wrapper */
    const authorWrapper = article.querySelector(select.article.author);

    /* get author from data-tags attribute */

    let author = article.getAttribute('data-author');
    console.log(author);

    /* save link's HTML data in an object and generate link html using a Handlebar template for author links */
    const linkHTMLData = {author: author};
    const linkHTML = templates.articleAuthor(linkHTMLData);
    console.log(linkHTML);

    /* [NEW] check if this link is NOT already in allAuthors */

    if (!allAuthors.hasOwnProperty(author)) { // eslint-disable-line

      /* [NEW] add generated code to allAuthors object */

      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }
    
    
    /* insert HTML of all the links into the author wrapper */

    authorWrapper.innerHTML = linkHTML;

  /* END LOOP: for every article: */
  }

  /* [NEW] find list of authors in right column */
  const authorsList = document.querySelector(select.listOf.authors);
  console.log(authorsList);

  /* [NEWER] create variable for object containing all authors data */

  const allAuthorsData = {authors: []};

  /* [NEW] START LOOP: for each author in allAuthors */

  for (let author in allAuthors) {
    /* [NEWER] push enlisted data to the object allAuthorsData */
    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author],
    });
    console.log(allAuthorsData);
  /* [NEW] END LOOP: for each author in allAuthors */
  }

  /* [NEW] add HTML from allAuthorsHTML to authorsList */

  authorsList.innerHTML = templates.authorSidebarLink(allAuthorsData);

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

  const linksToAuthors = document.querySelectorAll(select.all.linksTo.authors);

  /* START LOOP: for each link */

  for (let linkToAuthor of linksToAuthors) {

    /* add authorClickHandler as event listener for that link */

    linkToAuthor.addEventListener('click', authorClickHandler);

  /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();
