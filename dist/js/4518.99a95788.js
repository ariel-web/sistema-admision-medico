"use strict";(self["webpackChunkdashcode"]=self["webpackChunkdashcode"]||[]).push([[4518],{44518:function(e,i,t){t.r(i),t.d(i,{default:function(){return u}});var a=t(56385);function _(e){return e%10<5&&e%10>1&&~~(e/10)%10!==1}function r(e,i,t){var a=e+" ";switch(t){case"m":return i?"minuta":"minutę";case"mm":return a+(_(e)?"minuty":"minut");case"h":return i?"godzina":"godzinę";case"hh":return a+(_(e)?"godziny":"godzin");case"MM":return a+(_(e)?"miesiące":"miesięcy");case"yy":return a+(_(e)?"lata":"lat")}}var n="stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia".split("_"),s="styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień".split("_"),d=/D MMMM/,c=function(e,i){return d.test(i)?n[e.month()]:s[e.month()]};c.s=s,c.f=n;var u={name:"pl",weekdays:"niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota".split("_"),weekdaysShort:"ndz_pon_wt_śr_czw_pt_sob".split("_"),weekdaysMin:"Nd_Pn_Wt_Śr_Cz_Pt_So".split("_"),months:c,monthsShort:"sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru".split("_"),ordinal:function(e){return e+"."},weekStart:1,yearStart:4,relativeTime:{future:"za %s",past:"%s temu",s:"kilka sekund",m:r,mm:r,h:r,hh:r,d:"1 dzień",dd:"%d dni",M:"miesiąc",MM:r,y:"rok",yy:r},formats:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"}};a.d.locale(u,null,!0)}}]);
//# sourceMappingURL=4518.99a95788.js.map