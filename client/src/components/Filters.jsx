import React from 'react'
import Category from './Filters/Category'
import Type from './Filters/Type'
import Location from './Filters/Location'
import FindPost from './Filters/FindPost'

const Filters = () => {
  return (
    <div className="bg-transparent flex text-sm mt-32 mb-3 max-w-4xl">
        <Category/>
        <Type/>
        <Location/>
        <FindPost/>
    </div>

    // <form className="bg-transparent flex text-sm mt-32 mb-3 max-w-4xl" class="filters normal" action="/filter"> 

    //   <div class="filter dropdown"> 
    //     <button class="dropdown-toggle" data-toggle="dropdown"> 
    //       {/* <i class="fa fa-clone"></i>  */}
    //       Category <span class="value" data-label-placement="true">Hangouts</span> 
    //     </button> 
    //     <ul class="dropdown-menu c1"> 
    //       <li> 
    //         <input name="type[]" id="type_category" type="checkbox" value="category" checked="checked"/> 
    //         <label for="type_movie">Hangouts</label> 
    //       </li> 
          
    //       <li> 
    //         <input name="type[]" id="type_sports" type="checkbox" value="sports"/> 
    //         <label for="type_series">Sports</label> 
    //       </li> 
    //     </ul> 
    //   </div>

    //   <div class="filter dropdown show"> 
    //     <button class="dropdown-toggle" data-toggle="dropdown"> 
    //       {/* <i class="fa fa-folder-open"></i>  */}
    //       Genre 
    //       <span class="value" data-label-placement="true">All</span> 
    //     </button> 

    //     <ul class="dropdown-menu section lg c4 show">

    //       <li> 
    //         <input name="section[]" type="checkbox" id="section_action" value="25"/> 
    //         <label for="section_action">Action</label> 
    //       </li>

    //       <li> 
    //         <input name="section[]" type="checkbox" id="section_adventure" value="17"/> 
    //         <label for="section_adventure">Adventure</label> 
    //       </li> 
          
    //       <li> 
    //         <input name="section[]" type="checkbox" id="section_animation" value="10"/> 
    //         <label for="section_animation">Animation</label> 
    //       </li> 
          
    //       <li> 
    //         <input name="section[]" type="checkbox" id="section_biography" value="215"/> 
    //         <label for="section_biography">Biography</label> 
    //       </li> 
          
    //       <li> 
    //         <input name="section[]" type="checkbox" id="section_costume" value="1693"/> 
    //         <label for="section_costume">Costume</label> 
    //       </li> 
    //       <li> 
    //         <input name="section[]" type="checkbox" id="section_comedy" value="14"/> 
    //         <label for="section_comedy">Comedy</label> 
    //       </li> 
          
    //       <li> 
    //         <input name="section[]" type="checkbox" id="section_crime" value="26"/> 
    //         <label for="section_crime">Crime</label> 
    //       </li> 
          
    //       <li> 
    //         <input name="section[]" type="checkbox" id="section_documentary" value="131"/> 
    //         <label for="section_documentary">Documentary</label> 
    //       </li> 
          
    //       <li> 
    //         <input name="section[]" type="checkbox" id="section_drama" value="1"/> 
    //         <label for="section_drama">Drama</label> 
    //       </li> 
          
    //       <li> 
    //         <input name="section[]" type="checkbox" id="section_family" value="43"/> 
    //         <label for="section_family">Family</label> 
    //       </li> 
    //       <li> 
    //         <input name="section[]" type="checkbox" id="section_fantasy" value="31"/> 
    //         <label for="section_fantasy">Fantasy</label> 
    //       </li> 
          
    //       <li> 
    //         <input name="section[]" type="checkbox" id="section_game-show" value="212"/> 
    //         <label for="section_game-show">Game-Show</label> 
    //       </li> 
          
    //       <li> 
    //         <input name="section[]" type="checkbox" id="section_history" value="47"/> 
    //         <label for="section_history">History</label> 
    //       </li> 
          
    //       <li> 
    //         <input name="section[]" type="checkbox" id="section_horror" value="74"/> 
    //         <label for="section_horror">Horror</label> 
    //       </li> 
          
    //       <li> 
    //         <input name="section[]" type="checkbox" id="section_kungfu" value="248"/> 
    //         <label for="section_kungfu">Kungfu</label> 
    //       </li> 
          
    //       <li> 
    //         <input name="section[]" type="checkbox" id="section_music" value="199"/> 
    //         <label for="section_music">Music</label> 
    //       </li> 
          
    //       <li> 
    //         <input name="section[]" type="checkbox" id="section_mystery" value="64"/> 
    //         <label for="section_mystery">Mystery</label> 
    //       </li>

    //       <li> 
    //         <input name="section[]" type="checkbox" id="section_reality-tv" value="4"/> 
    //         <label for="section_reality-tv">Reality-TV</label> 
    //       </li> 
          
    //       <li> 
    //         <input name="section[]" type="checkbox" id="section_romance" value="23"/> 
    //         <label for="section_romance">Romance</label> 
    //       </li> 
          
    //       <li> 
    //         <input name="section[]" type="checkbox" id="section_sci-fi" value="15"/> 
    //         <label for="section_sci-fi">Sci-Fi</label> 
    //       </li> 
          
    //       <li> 
    //         <input name="section[]" type="checkbox" id="section_sport" value="44"/> 
    //         <label for="section_sport">Sport</label> 
    //       </li> 

    //       <li> 
    //         <input name="section[]" type="checkbox" id="section_thriller" value="7"/> 
    //         <label for="section_thriller">Thriller</label> 
    //       </li> 
          
    //       <li> 
    //         <input name="section[]" type="checkbox" id="section_tv-show" value="139"/> 
    //         <label for="section_tv-show">TV Show</label> 
    //       </li> 
          
    //       <li> 
    //         <input name="section[]" type="checkbox" id="section_war" value="58"/> 
    //         <label for="section_war">War</label> 
    //       </li> 
          
    //       <li> 
    //         <input name="section[]" type="checkbox" id="section_western" value="28"/> 
    //         <label for="section_western">Western</label> 
    //       </li> 
          
    //       <li> 
    //         <input type="checkbox" id="section_mode" name="section_mode" value="and"/> 
    //         <label className='font-thin' for="section_mode">Include all selected</label> 
    //       </li> 
    //     </ul> 
    //   </div> 
        

      
    //   <div class="filter dropdown"> 
    //     <button class="dropdown-toggle" data-toggle="dropdown"> 
    //       <i class="fa fa-globe-americas"></i> 
    //       Country 
    //       <span class="value" data-label-placement="true">All</span> 
    //     </button> 
    //   <ul class="dropdown-menu lg c4"> 
    //     <li> 
    //       <input name="country[]" type="checkbox" id="country_argentina" value="181863"/> 
    //       <label for="country_argentina">Argentina</label> 
    //     </li> 
        
    //     <li> 
    //       <input name="country[]" type="checkbox" id="country_australia" value="181851"/> 
    //       <label for="country_australia">Australia</label> 
    //     </li> 
        
    //     <li> 
    //       <input name="country[]" type="checkbox" id="country_austria" value="181882"/> 
    //       <label for="country_austria">Austria</label> 
    //     </li> 
        
    //     <li> 
    //       <input name="country[]" type="checkbox" id="country_belgium" value="181849"/> 
    //       <label for="country_belgium">Belgium</label> 
    //     </li> 
        
    //     <li> 
    //       <input name="country[]" type="checkbox" id="country_brazil" value="181867"/> 
    //       <label for="country_brazil">Brazil</label> 
    //     </li> 
        
    //     <li> 
    //       <input name="country[]" type="checkbox" id="country_canada" value="181861"/> 
    //       <label for="country_canada">Canada</label> 
    //     </li> 
        
    //     <li> 
    //       <input name="country[]" type="checkbox" id="country_china" value="108"/> 
    //       <label for="country_china">China</label> 
    //     </li> 
        
    //     <li> 
    //       <input name="country[]" type="checkbox" id="country_czech-republic" value="181859"/> 
    //       <label for="country_czech-republic">Czech Republic</label> 
    //     </li> 
        
    //     <li> 
    //       <input name="country[]" type="checkbox" id="country_denmark" value="181855"/> 
    //       <label for="country_denmark">Denmark</label> 
    //     </li> 
        
    //     <li> 
    //       <input name="country[]" type="checkbox" id="country_finland" value="181877"/> 
    //       <label for="country_finland">Finland</label> 
    //     </li> 
        
    //     <li> 
    //       <input name="country[]" type="checkbox" id="country_france" value="11"/> 
    //       <label for="country_france">France</label> 
    //     </li> 
        
    //     <li> 
    //       <input name="country[]" type="checkbox" id="country_germany" value="1025332"/> 
    //       <label for="country_germany">Germany</label> 
    //     </li> 
        
    //     <li> 
    //       <input name="country[]" type="checkbox" id="country_hongkong" value="2630"/> 
    //       <label for="country_hongkong">Hong Kong</label> 
    //     </li> 
        
    //     <li> 
    //       <input name="country[]" type="checkbox" id="country_hungary" value="181876"/> 
    //       <label for="country_hungary">Hungary</label> 
    //     </li> 
        
    //     <li> 
    //       <input name="country[]" type="checkbox" id="country_india" value="34"/> 
    //       <label for="country_india">India</label> 
    //     </li> 
        
    //     <li> 
    //       <input name="country[]" type="checkbox" id="country_international" value="18"/> 
    //       <label for="country_international">International</label> 
    //     </li> 
        
    //     <li> 
    //       <input name="country[]" type="checkbox" id="country_ireland" value="181862"/> 
    //       <label for="country_ireland">Ireland</label> 
    //     </li> 
        
    //     <li> 
    //       <input name="country[]" type="checkbox" id="country_israel" value="181887"/> 
    //       <label for="country_israel">Israel</label> 
    //     </li> 
        
    //     <li> 
    //       <input name="country[]" type="checkbox" id="country_italy" value="181857"/> 
    //       <label for="country_italy">Italy</label> 
    //     </li> 
        
    //     <li> 
    //       <input name="country[]" type="checkbox" id="country_japan" value="36"/> 
    //       <label for="country_japan">Japan</label> 
    //     </li> 
        
    //     <li> 
    //       <input name="country[]" type="checkbox" id="country_luxembourg" value="181878"/> 
    //       <label for="country_luxembourg">Luxembourg</label> 
    //     </li> 
        
    //     <li> 
    //       <input name="country[]" type="checkbox" id="country_mexico" value="181852"/> 
    //       <label for="country_mexico">Mexico</label> 
    //     </li> 
        
    //     <li> 
    //       <input name="country[]" type="checkbox" id="country_netherlands" value="181848"/> 
    //       <label for="country_netherlands">Netherlands</label> 
    //     </li> 
        
    //     <li> 
    //       <input name="country[]" type="checkbox" id="country_new-zealand" value="181847"/> 
    //       <label for="country_new-zealand">New Zealand</label> 
    //     </li> 
        
    //     <li> 
    //       <input name="country[]" type="checkbox" id="country_norway" value="181901"/> 
    //       <label for="country_norway">Norway</label> 
    //     </li> 
        
    //     <li> 
    //       <input name="country[]" type="checkbox" id="country_philippines" value="1025339"/> 
    //       <label for="country_philippines">Philippines</label> 
    //     </li> 
        
    //     <li> 
    //       <input name="country[]" type="checkbox" id="country_poland" value="181880"/> 
    //       <label for="country_poland">Poland</label> 
    //     </li> 
        
    //     <li> 
    //       <input name="country[]" type="checkbox" id="country_romania" value="181895"/> 
    //       <label for="country_romania">Romania</label> 
    //     </li> 
        
    //     <li> 
    //       <input name="country[]" type="checkbox" id="country_russia" value="181860"/> 
    //       <label for="country_russia">Russia</label> 
    //     </li> 
        
    //     <li> 
    //       <input name="country[]" type="checkbox" id="country_south-africa" value="181850"/> 
    //       <label for="country_south-africa">South Africa</label> 
    //     </li> 
        
    //     <li> 
    //       <input name="country[]" type="checkbox" id="country_south-korea" value="1025429"/> 
    //       <label for="country_south-korea">South Korea</label> 
    //     </li> 
        
    //     <li> 
    //       <input name="country[]" type="checkbox" id="country_spain" value="181871"/> 
    //       <label for="country_spain">Spain</label> 
    //     </li> 
        
    //     <li> 
    //       <input name="country[]" type="checkbox" id="country_sweden" value="181883"/> 
    //       <label for="country_sweden">Sweden</label> 
    //     </li> 
        
    //     <li> 
    //       <input name="country[]" type="checkbox" id="country_switzerland" value="181869"/> 
    //       <label for="country_switzerland">Switzerland</label> 
    //     </li> 
        
    //     <li> 
    //       <input name="country[]" type="checkbox" id="country_thailand" value="94"/> 
    //       <label for="country_thailand">Thailand</label> 
    //     </li> 
        
    //     <li> 
    //       <input name="country[]" type="checkbox" id="country_turkey" value="1025379"/> 
    //       <label for="country_turkey">Turkey</label> 
    //     </li> 
        
    //     <li> 
    //       <input name="country[]" type="checkbox" id="country_united-kingdom" value="8"/> 
    //       <label for="country_united-kingdom">United Kingdom</label> 
    //     </li> 
        
    //     <li> 
    //       <input name="country[]" type="checkbox" id="country_united-states" value="2"/> 
    //       <label for="country_united-states">United States</label> 
    //     </li> 
    //   </ul> 
    // </div>
    // <div class="filter submit"> 
    //   <button type="submit" class="btn btn-sm btn-primary">
    //     <i class="fa fa-filter"></i> 
    //     Filter
    //   </button> 
    // </div> 
    
    // <div class="clearfix"></div> 
    // </form>
  )
}

export default Filters