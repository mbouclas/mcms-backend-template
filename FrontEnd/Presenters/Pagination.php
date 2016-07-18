<?php

namespace FrontEnd\Presenters;

use Illuminate\Pagination\BootstrapThreePresenter;
use Illuminate\Support\HtmlString;

class Pagination  extends BootstrapThreePresenter
{

    public function render()
    {
        if ($this->hasPages()) {
            return new HtmlString(sprintf(
                '<ul class="pagination center-align">%s %s %s</ul>',
                $this->getPreviousButton('<i class="material-icons">chevron_left</i>'),
                $this->getLinks(),
                $this->getNextButton('<i class="material-icons">chevron_right</i>')
            ));
        }

        return '';
    }

    /**
     * Get HTML wrapper for an available page link.
     *
     * @param  string  $url
     * @param  int  $page
     * @param  string|null  $rel
     * @return string
     */
    protected function getAvailablePageWrapper($url, $page, $rel = null)
    {
        $rel = is_null($rel) ? '' : ' rel="'.$rel.'"';

        return '<li class="waves-effect"><a href="'.htmlentities($url).'"'.$rel.'>'.$page.'</a></li>';
    }

    protected function getActivePageWrapper($text)
    {
        return '<li class="active"><a href="">'.$text.'</a></li>';
    }

    protected function getDisabledTextWrapper($text)
    {
        return '<li class="disabled"><a href="">'.$text.'</a></li>';
    }
}