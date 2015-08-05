// ==UserScript==
// @id             adi_stackoverflow_filters.user.js
// @name           SO filters
// @version        1.0
// @namespace      
// @author         
// @description    Remove posts of SO-tagged-lists, if listed in the "exclude_post_nrs"-var.
// @include        http://stackoverflow.com/questions/tagged/plone
// @run-at         document-end
// ==/UserScript==

// This script is ment to be injected in a browser.
// For example with Firefox, you can install the FF-addon "Scriptish",
// then do "Add new user-script" and paste below the generated header,
// the following lines into the editor:

var exclude_post_nrs = [ // Add the posts, you don't want to see, here.
'31730727',
'31570498',
'31026685',
'31192606',
'31026685',
]
var posts = document.getElementsByClassName('question-summary')
for(var i=0; i<posts.length; i++) {
    var post = posts[i]
    var post_link = post.getElementsByClassName('question-hyperlink')[0]
    var post_url  = post_link.getAttribute('href')
    var post_nr   = post_url.split('/')[2] 
    for(var j=0; j<exclude_post_nrs.length; j++) {
        if(exclude_post_nrs[j] == post_nr) {
            post.remove()
        }
    }
}

