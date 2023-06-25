<template>
  <div class="ban-box" dir="rtl">
    <div class="logo-top">
      <img src="/img/logo.png" />
    </div>
    <small>لطفا جهت دریافت لیست کاتالوگ ها و اخبار شرکت بان شماره تماس خود را وارد نمایید</small>

    <div class="card-box">
       <div class="number-box">
        <input id="phone_element" readonly type="text"  v-model="phone" >
       </div>

      <div class="numbers" dir="ltr">
        <div class="nm">
           <div @click="input(1)">
             <label>1</label>
           </div>
          <div @click="input(2)">
            <label>2</label>
          </div>
          <div @click="input(3)">
            <label>3</label>
          </div>
        </div>
        <div class="nm">
          <div @click="input(4)">
            <label>4</label>
          </div>
          <div @click="input(5)">
            <label>5</label>
          </div>
          <div @click="input(6)">
            <label>6</label>
          </div>
        </div>
        <div class="nm">
          <div @click="input(7)">
            <label>7</label>
          </div>
          <div @click="input(8)">
            <label>8</label>
          </div>
          <div @click="input(9)">
            <label>9</label>
          </div>
        </div>
        <div class="nm">
          <div @click="rem" style="font-size: 13px;color: red;font-weight: bold">
            <label>حذف</label>
          </div>
          <div @click="input(0)">
            <label>0</label>
          </div>
          <div @click="saveNumber" style="font-size: 13px;color: green;font-weight: bold">
            <label>ثبت</label>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>
<script>
import Swal from "sweetalert2";

export function useSwal() {
  // update default options
  const Alert = Swal.mixin({
    allowOutsideClick: false,
    reverseButtons: true,
  });

  return {
    Alert,
  };
}

export default {
  setup(){
    const { Alert }  = useSwal()

    return {
      Alert
    }
  },
  data:() => ({
    phone: "",
  }),
  mounted() {

  },
  methods: {
    async saveNumber(){
      if(!this.phone || this.phone.length < 11){
       return this.Alert.fire({
          icon: 'error',
          title: 'خطا !',
          text: 'لطفا شماره تماس را به درستی وارد نمایید!',
         confirmButtonText: `متوجه شدم!`,
       })
      }
      const { value: formValues } = await this.Alert.fire({
        title: 'ممنونیم :)',
        text: 'لطفا حوزه کاری خودت رو انتخاب کن قبل ثبت',
        icon: 'question',
        confirmButtonText: 'ثبت اطلاعات',
        html: `<span style="font-size: 13px; margin-bottom: 15px;font-weight: bold;display:block;">اگر تمایل داشتید حوزه کاری خود را انتخاب کنید</span><div class="multi_select">`+
               `<div class="item"><input name="types[]" id="sl_1" value="erp" type="checkbox"> <label for="sl_1">ERP</label></div>`+
               `<div class="item"><input  name="types[]" id="sl_2"  value="datacenter"  type="checkbox"> <label for="sl_2">دیتاسنتر</label></div>`+
               `<div class="item"><input name="types[]" id="sl_3"  value="iot"  type="checkbox"> <label for="sl_3">IOT</label></div>`+
               `<div class="item"><input name="types[]" id="sl_4"   value="financial" type="checkbox"> <label for="sl_4">نرم افزار های تحت وب و مالی</label></div>`+
               `<div class="item"><input name="types[]"  id="sl_5"  value="order" type="checkbox"> <label for="sl_5">سفارش گیر</label></div>`+
               `<div class="item"><input name="types[]" id="sl_6"   value="other" type="checkbox"> <label for="sl_6">سایر</label></div>`+
            `</div>`,
        preConfirm: () => {
          return [
            (document.getElementsByName('types[]')[0].checked ? document.getElementsByName('types[]')[0].value : false),
            (document.getElementsByName('types[]')[1].checked ? document.getElementsByName('types[]')[1].value : false),
            (document.getElementsByName('types[]')[2].checked ? document.getElementsByName('types[]')[2].value : false),
            (document.getElementsByName('types[]')[3].checked ? document.getElementsByName('types[]')[3].value : false),
            (document.getElementsByName('types[]')[4].checked ? document.getElementsByName('types[]')[4].value : false),
            (document.getElementsByName('types[]')[5].checked ? document.getElementsByName('types[]')[5].value : false),

          ]
        }

      })
      if (formValues) {

        try {
          await this.SendAndSave(formValues)

        }catch (er){
           this.Alert.fire({
            icon: 'error',
            title: 'خطا !',
            text: 'ارتباط با سرور برقرار نشد مجددا تلاش نمایید!',
            confirmButtonText: `متوجه شدم!`,
          })
        }

      }
    },
    input(num){
      if(this.phone.length === 11){
        return;
      }
      let $element = document.getElementById('phone_element')
      if($element){
        $element.value = $element.value+num
        this.phone = $element.value
      }
    },
    rem(){
      let $element = document.getElementById('phone_element')
      if($element){
        $element.value = $element.value.substr(0, $element.value.length - 1);
      }
    },
    async SendAndSave(form){
     return await $fetch('https://arta20.top/api/save_stogram',{method: "POST",body: {
          phone: this.phone,
          data: form,
        }})
    }
  }
}
</script>