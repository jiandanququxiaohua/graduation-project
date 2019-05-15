
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


public partial class login : System.Web.UI.Page
{
    DbHelperV2 dbhelperv2 = new DbHelperV2();
    protected void Page_Load(object sender, EventArgs e)
    {

        var loginName = Request.QueryString.Get("name") ?? "";
        var loginPsw = Request.QueryString.Get("psw") ?? "";

        //post取参
        //var cc=Request.Params.Get("name") ?? "";
        try
        {
            //登录
            Response.Write(JsonConvert.SerializeObject(LoginClothes(loginName, loginPsw)));
            return;
        }
        catch (Exception ex)
        {
            Response.Write(JsonConvert.SerializeObject(new Result { Code = 500, IsTrue = false, Message = ex.ToString() }));
        }
    }


    /// <summary>
    /// 登录
    /// </summary>
    /// <param name="loginName"></param>
    /// <param name="loginPsw"></param>
    /// <returns></returns>
    private Result LoginClothes(string loginName, string loginPsw)
    {
        var result = new Result<List<User>>();
        //此处需优化，参数化处理
        var sqltextFomat = "select * from [clothes].[dbo].[user] where userName='{0}' and password='{1}'";
        var dt = dbhelperv2.ExecuteDataTable(string.Format(sqltextFomat, loginName, loginPsw));
        if (dt == null || dt.Rows.Count == 0)
        {
            //Error todo  
            result.Code = 403;
            result.Message = "查无此人！";
            result.IsTrue = false;
            result.Date = new List<User>();
            return result;
        }
        var users = dt.ToUsers();
        result.Code = 200;
        result.Message = "成功！";
        result.Date = users;
        result.IsTrue = true;
        return result;
    }
}