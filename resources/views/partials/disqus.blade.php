@if (App::environment() === 'production')

    <div id="disqus_thread"></div>
    <script async>

         var disqus_config = function () {
         this.page.url = window.location.href;  // Replace PAGE_URL with your page's canonical URL variable
         this.page.identifier = 'article-{{$slug}}';
         };
        (function() {  // DON'T EDIT BELOW THIS LINE
            var d = document, s = d.createElement('script');

            s.src = '//galastylein.disqus.com/embed.js';

            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
        })();
    </script>
    <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript" rel="nofollow">comments powered by Disqus.</a></noscript>
@endif