<template>
  <div>
    <div class="ban-wrapper">
      <div class="glowing">

        <span style="--i:1;"></span>

        <span style="--i:2;"></span>

        <span style="--i:3;"></span>

      </div>

      <div class="glowing">

        <span style="--i:1;"></span>

        <span style="--i:2;"></span>

        <span style="--i:3;"></span>

      </div>

      <div class="glowing">

        <span style="--i:1;"></span>

        <span style="--i:2;"></span>

        <span style="--i:3;"></span>

      </div>

      <div class="glowing">

        <span style="--i:1;"></span>

        <span style="--i:2;"></span>

        <span style="--i:3;"></span>

      </div>
    </div>

  <div class="ban-box" dir="rtl">
    <div class="logo-top">
      <img src="/img/logo.png?t=1" />
    </div>

    <div class="card-box">
       <div class="number-box">
        <input id="phone_element" placeholder="09111234567" readonly type="text"  v-model="phone" >
       </div>

        <div class="numbers" dir="ltr">
           <div @click="input(1)">
             <div>1</div>
           </div>
          <div @click="input(2)">
            <div>2</div>
          </div>
          <div @click="input(3)">
            <div>3</div>
          </div>
          <div @click="input(4)">
            <div>4</div>
          </div>
          <div @click="input(5)">
            <div>5</div>
          </div>
          <div @click="input(6)">
            <div>6</div>
          </div>
          <div @click="input(7)">
            <div>7</div>
          </div>
          <div @click="input(8)">
            <div>8</div>
          </div>
          <div @click="input(9)">
            <div>9</div>
          </div>
          <div @click="rem">
            <div  style="color: red!important;font-weight: bold">حذف</div>
          </div>
          <div @click="input(0)">
            <div>0</div>
          </div>
          <div @click="saveNumber" >
            <div style="color: green!important;font-weight: bold">ثبت</div>
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
        html: `<div style="font-size: 13px; margin-bottom: 15px;font-weight: bold;display:block;">اگر تمایل داشتید حوزه کاری خود را انتخاب کنید</div><div class="multi_select">`+
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
          this.phone = ""
          this.Alert.fire({
            icon: 'success',
            title: 'ممنونم :)',
            text: 'اطلاعات شما با موفقیت ثبت شد',
            confirmButtonText: `خروج!`,
          })
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
      let element = document.getElementById('phone_element')
      if(element){
        element.value = element.value+num
        this.phone = element.value
      }
    },
    rem(){
      let element = document.getElementById('phone_element')
      if(element){
        element.value = element.value.substr(0, element.value.length - 1);
        this.phone = element.value

      }
    },
    async SendAndSave(form){
     return await $fetch('https://api.arta20.top/api/save_stogram',{method: "POST",body: {
          phone: this.phone,
          data: form,
        }})
    }
  }
}
</script>