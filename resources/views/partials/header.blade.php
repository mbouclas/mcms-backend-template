<header class="site-header z-depth-1">
    <div class="container">
        <div class="row">
            <div class="col col-xs-6 col-sm-3">
                <a href="/" title="Home" class="logo"><img src="{{asset('img/logo.png')}}"></a>
            </div>

            <div class="col col-xs-6 col-sm-9 right-align">
                <div class="menu main-menu">
                    <a href="#" class="menu-btn"><span></span><span></span><span></span></a>
                    <nav class="menu-list-wrap">
                        <ul class="menu-list">
                            @each('partials.menuWrapper', $HeaderMenu, 'item')
                        </ul>
                    </nav>
                </div><!-- END MENU -->
                <div class="action-box">
                    <a href="#" class="header-btn">
                        <svg fill="#9e9e9e" width="20" height="20" viewBox="0 0 17 17" enable-background="new 0 0 17 17"
                             xml:space="preserve">
								<path fill="inherit"
                                      d="M16.604 15.868l-5.173-5.173c0.975-1.137 1.569-2.611 1.569-4.223 0-3.584-2.916-6.5-6.5-6.5-1.736 0-3.369 0.676-4.598 1.903-1.227 1.228-1.903 2.861-1.902 4.597 0 3.584 2.916 6.5 6.5 6.5 1.612 0 3.087-0.594 4.224-1.569l5.173 5.173 0.707-0.708zM6.5 11.972c-3.032 0-5.5-2.467-5.5-5.5-0.001-1.47 0.571-2.851 1.61-3.889 1.038-1.039 2.42-1.611 3.89-1.611 3.032 0 5.5 2.467 5.5 5.5 0 3.032-2.468 5.5-5.5 5.5z"/>
							</svg>
                    </a>
                    <div class="action-content">
                        <div class="action-content-wrap">
                            <form class="header-search">
                                <div class="input-field">
										<span class="icon">
											<svg fill="#000" width="20" height="20" viewBox="0 0 17 17"
                                                 enable-background="new 0 0 17 17" xml:space="preserve">
												<path fill="inherit"
                                                      d="M16.604 15.868l-5.173-5.173c0.975-1.137 1.569-2.611 1.569-4.223 0-3.584-2.916-6.5-6.5-6.5-1.736 0-3.369 0.676-4.598 1.903-1.227 1.228-1.903 2.861-1.902 4.597 0 3.584 2.916 6.5 6.5 6.5 1.612 0 3.087-0.594 4.224-1.569l5.173 5.173 0.707-0.708zM6.5 11.972c-3.032 0-5.5-2.467-5.5-5.5-0.001-1.47 0.571-2.851 1.61-3.889 1.038-1.039 2.42-1.611 3.89-1.611 3.032 0 5.5 2.467 5.5 5.5 0 3.032-2.468 5.5-5.5 5.5z"/>
											</svg>
										</span>
                                    <input class="search-input" type="search" name="search" placeholder="Search ...">
                                </div>
                                <a class="btn close" href="#"></a>
                            </form>
                        </div>
                    </div>
                </div><!-- .action-box -->
            </div>
        </div>
    </div>
</header>