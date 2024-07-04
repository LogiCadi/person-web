<?php

namespace app\index\controller;

class Index
{
    public function index()
    {
        $city = input('city');
        $job = input('job');

        // 会计平均薪资
        $res = $this->request('https://m.jobui.com/salary/?cityKw=' . $city . '&jobKw=会计');
        $start = strpos($res, "￥") + 3;
        $end = strpos($res, "，", $start);
        $baseSalary = substr($res, $start, $end - $start);

        $res = $this->request('https://m.jobui.com/salary/?cityKw=' . $city . '&jobKw=' . $job);
        $start = strpos($res, "￥") + 3;
        $end = strpos($res, "，", $start);
        $salary = substr($res, $start, $end - $start);

        echo round($salary / $baseSalary, 2);
    }



    /**服务端基础curl */
    public function request($url, $data = null)
    {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        if ($data) {
            //设置post方式提交
            curl_setopt($curl, CURLOPT_POST, 1);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
        }
        $res = curl_exec($curl);
        curl_close($curl);

        $p_res = json_decode($res, true);
        if ($p_res) {
            return $p_res;
        } else {
            return $res;
        }
    }
}
