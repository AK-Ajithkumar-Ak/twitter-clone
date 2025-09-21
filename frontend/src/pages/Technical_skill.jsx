import { useEffect } from "react"
import { FaArrowLeft } from "react-icons/fa6"
import { Link } from "react-router-dom"

export const Technical_skill = ({setviewskill}) => {
    useEffect(()=>{
        setviewskill(true)
    },[])
        
  return (
    <div className="tech-parant">
    <h1 className="text-center text-3xl text-success">Technical_skill</h1><br />
    <h4><span className="text-warning">Contact</span>: ajithkumar130901@gmail.com</h4><br />

    <h2 className="mytech">front-end technology</h2>
    <table>
        <thead>
            <tr>
                <th>front-end</th>
                <th>topics</th>
            </tr>
        </thead>
        <tbody>
            <tr><td>html</td> <td>latest semantic tag</td></tr>
            <tr><td>css</td> <td><span className="num">1)</span> types of selector, <span className="num">2)</span> types of unites, <span className="num">3)</span> @media query, <br /><span className="num">4)</span> animation property, <span className="num">5)</span> Transition property, <span className="num">6)</span> backround property, <br /><span className="num">7)</span> flex-box, <span className="num">8)</span> grid-system, <span className="text_low etc"> ...etc</span></td></tr>
            <tr><td>JS</td> <td><span className="num">1)</span> variable, <span className="num">2)</span> Data types, <span className="num">3)</span> operators, <br /><span className="num">4)</span> types of function, <span className="num">5)</span> Conditional statement & looping <span className="num">6)</span> Regular expression, <br /><span className="num">7)</span> oops concept, <span className="num">8)</span> Exceptional handling, <span className="num">9)</span> API fetching & Integrate data, <br /><span className="num">10)</span> Browser events, <span className="num">11)</span> event loop, <span className="num">12)</span> DOM & BOM, <br /><span className="num">13)</span> Polyfil <span className="text_low etc">...etc</span></td></tr>
            <tr><td>react.js <br /><sub>/ vite</sub> </td> <td><span className="num">1)</span> routing, <span className="num">2)</span> Functional component, <br /><span className="num">3)</span> Hooks = <span className="red">[</span> usestate, useEffect, usereducer, useRef, usecontext, useParams, useSearchParams, useNavigate, usememo, useCallback <span className="red">]</span></td></tr>
            <tr><td>next.js</td> <td>latest app routing, layout, server/ client component</td></tr>
            <tr><td>bootstrap</td> <td>latest version 5.3,</td></tr>
        </tbody>
    </table>

    <h2 className="mytech">back-end technology</h2>
    <table>
        <thead>
            <tr>
                <th>back-end</th>
                <th>topics</th>
            </tr>
        </thead>
        <tbody>
            <tr><td>node.js | express.js</td> <td>api routing, middleware, core modules = <span className="red">[</span> fs, path, os, http, crypto, url <span className="red">]</span>, </td></tr>
            <tr><td>socket.io</td> <td> simultaneously Communicate client and server using Channel  </td></tr>
        </tbody>
    </table>

    <h2 className="mytech">database</h2>
    <table>
        <thead>
            <tr>
                <th>nosql</th>
                <th>topics</th>
            </tr>
        </thead>
        <tbody>
            <tr><td>mongo db | mongoose</td> <td><span className="num">1)</span> important methods, <span className="num">2)</span> types of query operators, <span className="num">3)</span> schema design and validation, <br /><span className="num">4)</span> virtual field, <span className="num">5)</span> middleware, <span className="num">6)</span> populate | Relationship, <br /><br /> <span className="num">7)</span> aggregation pipeline stages = <span className="red">[</span> $lookup, $unwind, $group, $project, $addfield, $bucket, $sort, $skip, $limit, $objectToArray <span className="red">]</span>, <span className="num">8)</span> Pagenation </td></tr>
        </tbody>
        <tfoot>
            <tr> <td className="cap" colSpan={"2"}>practised collection url = <span className="num">1)</span> <a href="https://github.com/neelabalan/mongodb-sample-dataset/tree/main/sample_supplies" target="_blank" style={{marginRight:"40px"}} className="link" >Sales,</a> <span className="num">2)</span> <a href="https://github.com/neelabalan/mongodb-sample-dataset/tree/main/sample_analytics" target="_blank" className="link">sample_analytics data</a></td> </tr>
        </tfoot>
    </table>

    <h2 className="mytech">others</h2>
    <table>
        <thead>
            <tr>
                <th>os</th>
                <th>commands</th>
            </tr>
        </thead>
        <tbody>
            <tr><td>linux ubuntu</td> <td className="text_low">file system command = <span className="red">[</span> ls, mkdir, rmdir, rm, <span className="etc">...etc</span> <span className="red">]</span> cat, aux, <br />
            chmod, grep, find, (ln ls), nohup, ps, top, <span className="etc">...etc</span></td></tr>
            <tr><td>git</td> <td>push, pull, config, add, commit, branch, checkout, log, merge,  <span className="etc text_low">...etc</span></td></tr>
        </tbody>
    </table>
    <table>
        <tbody>
        <tr><td>seo</td> <td className="text_low">On page SEO, Technical SEO, Robot.txt sitemap.xml .htaccess file, <span className="etc text_low">...etc</span></td></tr>
        </tbody>
    </table>

    <h2 className="mytech">packages</h2>
    <table>
        <thead>
            <tr>
                <th>package</th>
            </tr>
        </thead>
        <tbody>
            <tr><td className="text_low" >@tanstack/react-query</td></tr>
            <tr><td className="text_low" >axios</td></tr>
            <tr><td className="text_low" >socket.io client / server</td></tr>
            <tr><td className="text_low" >Express-rate-limit </td></tr>
            <tr><td className="text_low" >express-session </td></tr>
            <tr><td className="text_low" >Multer</td></tr>
            <tr><td className="text_low" >Bcryptjs</td></tr>
            <tr><td className="text_low" >cookie-parser</td></tr>
            <tr><td className="text_low" >jwt</td></tr>
            <tr><td className="text_low" >Cloudinary</td></tr>
            <tr><td className="text_low" >Cors</td></tr>
            <tr><td className="text_low" >Uuid</td></tr>
            <tr><td className="text_low" >Mailtrap</td></tr>
            {/* <tr><td className="text_low" ></td></tr> */}
            {/* <tr><td className="text_low" ></td></tr> */}
        </tbody>
    </table>
   <Link to={"/"} className="flex justify-center"
   onClick={()=>setviewskill(false)}
   ><button className='btn rounded-full btn-primary text-white'><FaArrowLeft/> back to home</button></Link>
    </div>
  )
}
