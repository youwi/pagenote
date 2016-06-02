
import React from 'react';
import { render } from 'react-dom';


//...
// 或者单独使用一个组件

// var ReactUI = require('rctui');
// var Form = ReactUI.Form;
 var Input = require('rctui/Input');
// var CheckboxGroup = require('rctui/CheckboxGroup');
// var FormControl = require('rctui/FormControl');

import PGnav from './components/nav/PGnav.js';
let appNode = document.getElementById('appNode');

render(
        <div>
            <Input grid={1/4} placeholder="基础文本" />
            <PGnav />
        </div>
    ,appNode);




