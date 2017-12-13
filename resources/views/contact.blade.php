@extends('layouts.app')

@section('meta-title')
Contact us
@endsection
@section('critical-css')
    @criticalCss('contact')
@endsection
@section('content')
    <header class="page-header">
        <h1>Επικοινωνία</h1>
    </header>
    <div class="container">
        <article class="post page bg z-depth-1">
            <div class="post-content">
                <div class="post-entry">
                    <h4>Επικοινωνήστε μαζί μας και θα σας απαντήσουμε το δυνατόν συντομότερο.</h4>

                    <ul class="contacts-list">
                        <li><i class="material-icons">place</i> <strong>Address:</strong> 79 Kantaras Aven., 3rd Floor, 2043 Strovolos, Nicosia, P.O.Box: 20368 CY 2151</li>
                        <li><i class="material-icons dp48">phone</i> <strong>Phone:</strong> (+357) 22252222</li>
                        <li><i class="material-icons dp48">message</i> <strong>Email:</strong> <a href="mailto:info@galastyle.in">info@galastyle.in</a></li>
                    </ul>

                    <form method="post" class="contact-form">
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="input-field comment-form-author">
                                    <label for="name">Όνομα <span class="required red-text">*</span></label>
                                    <input id="name" class="validate" name="name" type="text" value="" required
                                           oninvalid="this.setCustomValidity('Το πεδίο όνομα είναι υποχρεωτικό')">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="input-field comment-form-email">
                                    <label for="email">Email <span class="required red-text">*</span></label>
                                    <input id="email" class="validate" name="email" type="text" value="" required
                                           oninvalid="this.setCustomValidity('Το πεδίο email είναι υποχρεωτικό')">
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="input-field comment-form-url">
                                    <label for="phone">Τηλέφωνο</label>
                                    <input id="phone" name="phone" type="text" value="">
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="input-field comment-form-comment">
                                    <label for="comment">Σχόλια <span class="required red-text">*</span></label>
                                    <textarea id="comment" class="materialize-textarea" name="comment" required
                                              oninvalid="this.setCustomValidity('Το πεδίο σχόλια είναι υποχρεωτικό')"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="alert alert-danger form-message-fail" style="display: none">
                            Πρέπει να κάνετε click στο πεδίο "i'm not a robot"
                        </div>
                        <div class="g-recaptcha" data-sitekey="6Le_3DwUAAAAAP-0ZEohKUWRmXNCbT855ckUFKNN"
                        style="margin-bottom: 10px;"></div>

                        <div class="form-submit">
                            <button type="submit" class="btn submit">Αποστολή</button>
                            <span class="form-message form-message-success">Ευχαριστούμε για την επικοινωνία</span>
                        </div>
                    </form>
                </div>

                <div class="post-footer">
                    <div class="post-footer-item post-sharing">
                        <div class="icons-list">
								<span class="icon">
									<svg fill="#9e9e9e" width="20" height="20" viewBox="0 0 502.749 502.749" style="enable-background:new 0 0 502.749 502.749;" xml:space="preserve">
										<path fill="inherit" d="M394.4,148.299c1.417,0,2.833,0.283,4.25,0.283l0,0c39.1,0,71.683-30.883,73.95-69.983
										c2.267-40.8-28.9-75.933-69.7-78.483c-41.083-2.267-75.933,29.183-78.2,69.7c-0.567,9.917,0.85,19.267,3.683,28.05L152.15,202.982
										c-13.033-11.05-29.75-17.85-48.167-17.85c-40.8,0-73.95,33.15-73.95,73.95s33.15,73.95,73.95,73.95
										c17.283,0,33.433-5.95,45.9-16.15l171.983,93.5c-4.533,17.567-2.267,35.983,6.233,52.133c12.75,24.65,37.967,40.233,65.733,40.233
										l0,0c11.9,0,23.517-3.117,34-8.783c36.267-18.7,50.433-64.033,31.733-100.017c-12.75-24.65-37.967-39.95-65.733-39.95
										c-11.9,0-23.517,2.833-34,8.5c-8.5,4.533-16.15,10.483-22.1,17.567l-166.317-90.383c4.25-9.35,6.8-19.833,6.8-30.883
										c0-10.2-1.983-19.833-5.667-28.617l174.25-103.417C358.983,139.232,375.699,147.449,394.4,148.299z M358.699,72.082
										c1.133-21.25,18.7-37.683,39.95-37.683c0.85,0,1.7,0,2.267,0c22.1,1.417,38.817,20.117,37.683,42.217
										c-1.133,21.817-20.117,38.817-42.217,37.683C374.283,112.882,357.283,93.899,358.699,72.082z M64.033,259.082
										c0-22.1,17.85-39.95,39.95-39.95s39.95,17.85,39.95,39.95s-17.85,39.95-39.95,39.95S64.033,281.182,64.033,259.082z
										 M375.416,392.815c5.667-3.117,11.9-4.533,18.417-4.533c15.017,0,28.617,8.217,35.7,21.533c10.2,19.55,2.55,43.917-17,53.833
										c-5.667,3.117-11.9,4.533-18.417,4.533l0,0c-15.017,0-28.617-8.217-35.7-21.533c-4.817-9.35-5.95-20.4-2.55-30.6
										C358.699,406.132,365.783,397.632,375.416,392.815z"></path>
									</svg>
								</span>
                            <ul class="social">
                                <li><a href="#" class="twitter-bg"><i class="fa fa-twitter"></i></a></li>
                                <li><a href="#" class="facebook-bg"><i class="fa fa-facebook"></i></a></li>
                                <li><a href="#" class="google-plus-bg"><i class="fa fa-google-plus"></i></a></li>
                                <li><a href="#" class="pinterest-bg"><i class="fa fa-pinterest-p"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
    </article>
    </div>
@endsection