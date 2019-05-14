
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CYQ.Data.Tool;
using DBUtilityV2;
using Newtonsoft.Json;


public partial class register : System.Web.UI.Page
{
    DbHelperV2 dbhelperv2 = new DbHelperV2();
    protected void Page_Load(object sender, EventArgs e)
    {

        var loginName = Request.QueryString.Get("name") ?? "";
        var loginPsw = Request.QueryString.Get("psw") ?? "";
        var alias = Request.QueryString.Get("alias") ?? "";
        var age = Request.QueryString.Get("age") ?? "";

        //post取参
        //var cc=Request.Params.Get("name") ?? "";
        try
        {
            //注册           
            Response.Write(JsonConvert.SerializeObject(RegisterClothes(loginName, loginPsw, alias, age)));
            return;
        }
        catch (Exception ex)
        {
            Response.Write(JsonConvert.SerializeObject(new Result { Code = 500, IsTrue = false, Messge = ex.ToString() }));
        }
    }

    /// <summary>
    /// 注册
    /// </summary>
    /// <param name="loginName"></param>
    /// <param name="loginPsw"></param>
    /// <param name="alias"></param>
    /// <param name="age"></param>
    /// <returns></returns>
    private Result RegisterClothes(string loginName, string loginPsw, string alias, string age)
    {
        var result = new Result();
        //此处需优化，参数化处理
        var sqltextFomat = "insert into [clothes].[dbo].[user] (userName,password,age,alias) values ('{0}','{1}','{2}','{3}') ";
        var sqlText = string.Format(sqltextFomat, loginName, loginPsw, age, alias);
        dbhelperv2.ExecuteNonQuery(new List<string> { sqlText });
        result.Code = 200;
        result.Messge = "成功！";
        result.IsTrue = true;
        return result;
    }

}