import 'dotenv/config' 
 import Snoowrap from 'snoowrap';

 export const handler = async (event, context) => {
  const reddit = new Snoowrap({
    userAgent: process.env.USER_AGENT,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
  });
  
  // Function to submit a self-post
  function submitSelfPost() {
    console.log('---------------------------');
    reddit.getSubreddit('test').submitSelfpost({
      title: "my demo title",
      text: 'my demo text',
    }).then((post) => {
      console.log('Submitted self-post:', post.id);
    }).catch((error) => {
      console.error('Error submitting self-post:', error);
    });
  }
  
  // Function to reply to new comments
  function replyToComments() {
    reddit.getSubreddit('test').getNewComments().then(comments => {
      comments.map(comment => {
        comment.reply('test reply from bot').then(() => {
          console.log('Replied to comment:', comment.id);
        }).catch((error) => {
          console.error('Error replying to comment:', error);
        });
      });
    }).catch((error) => {
      console.error('Error fetching new comments:', error);
    });
  }
  
  // Run functions periodically 
  const interval = 60000; // 1 minute
  
  setInterval(() => {
    submitSelfPost();
    replyToComments();
  }, interval);
 }

handler()