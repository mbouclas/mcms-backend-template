FROM php:7.2-fpm

# Copy composer.lock and composer.json
COPY ./gala-style/composer.json /var/www/

# Set working directory
WORKDIR /var/www

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install extensions
RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl
RUN docker-php-ext-configure gd --with-gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ --with-png-dir=/usr/include/
RUN docker-php-ext-install gd
RUN docker-php-ext-install opcache

RUN apt-get update && apt-get install -y libmagickwand-dev imagemagick && \
    pecl install imagick && docker-php-ext-enable imagick && \
    rm -rf /var/lib/apt/lists/*

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Add user for laravel application
RUN groupadd -g 1000 www
RUN useradd -u 1000 -ms /bin/bash -g www www
#RUN chown -R 1000:1000 /var/www #: FOR PRODUCTION
# Copy existing application directory contents #: FOR PRODUCTION
#COPY . /var/www

# Copy existing application directory permissions #: FOR PRODUCTION
#COPY --chown=www:www . /var/www #: FOR PRODUCTION

# Change current user to www
#USER www #: FOR PRODUCTION

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]
