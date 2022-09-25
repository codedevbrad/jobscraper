
- mongodbAtlas  
   - https://cloud.mongodb.com/v2/5cc972a8ff7a25e6a7788936#metrics/replicaSet/61e85b81b0a68a5db035002d/explorer/yellScraper/categories/find 


#
* https://www.yell.com/k/popular+searches.html

# implemented ...

* takes snapshots of url at desktop and mobile view
* uploads to images to cloudinary.
* returns cloudinary urls with web url as an object.

[  ] scrapes a-z of categories
     [  ] rotate through category paginated pages.
[  ] scrapes business's from category alphabet passed by paginated.
[  ] 

programmatically go through each letter
     - paginate categories in each letter ( including category nextpages in letter ).
          - go through 1 - 3 categories each iteration.
              - get all business's in category (including next pages).

## found that
 * the yelp api does not return contact data
 * puppeteer is great for navigating the page and snapshots but I found retrieving data through
   selectors quite hard.