<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/1/11
 * Time: 14:11
 */
session_start();
require './ValidateCode.class.php';  //先把类包含进来，实际路径根据实际情况进行修改。
$_vc = new ValidateCode();  //实例化一个对象
$_vc->doimg();
$value= $_vc->getCode();//验证码保存到SESSION中




//echo "<font color=red>输入有误</font>";
//echo "<font color=green>通过验证</font>";