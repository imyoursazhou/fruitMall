import zh_CN from 'vee-validate/dist/locale/zh_CN'; //引入中文包，提示信息可以以中文形式显示
import {Validator} from 'vee-validate';


//设置VeeValidate插件的config配置
export default {
  errorBagName: 'errors',
  fieldsBagName: 'fields',
  delay: 0,
  locale: 'zh_CN',
  strict: true,
  enableAutoClasses: true,
  classNames: {
    touched: 'touched', // the control has been blurred
    untouched: 'untouched', // the control hasn't been blurred
    valid: 'valid', // model is valid
    invalid: 'invalid', // model is invalid
    pristine: 'pristine', // control has not been interacted with
    dirty: 'dirty' // control has been interacted with
  },
  events: 'blur',
  inject: true
};

const dictionary = {
  zh_CN: {
    messages: {
      required: (field) => field + '不得为空',
      min: ()=>'密码不得小于6位数'
    },
    attributes: {   // 设置提示的名词
      registerUsername: '账号',
      registerPassword: '密码',
      loginUsername: '账号',
      loginPassword: '密码'
    }
  }
};
Validator.localize('zh_CN', dictionary.zh_CN);
