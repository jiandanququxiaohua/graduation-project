using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using Newtonsoft.Json;




public static  class StyleHelper
{


  public Result GetInfo()
  {
        var result = new Result<Style>();
        //此处需优化，参数化处理
        var sqltextFomat = "select * from [clothes].[dbo].[style]";
        var dt = dbhelperv2.ExecuteDataTable(string.Format(sqltextFomat, userid));
        if (dt == null || dt.Rows.Count == 0)
        {
            //Error todo  
            result.Code = 403;
            result.Message = "查无此人！";
            result.IsTrue = false;
            result.Data = new Result<Style>();
            return result;
        }
        var dts = dt.ToStyles();
        result.Code = 200;
        result.Message = "成功！";
        result.Data = dts;
        result.IsTrue = true;
        return result;
  }

public Result AddClothType(string sName,string describe)
  {
         var result = new Result();
        //此处需优化，参数化处理
        var sqltextFomat = "insert into [clothes].[dbo].[style] (sName,describe) values ('{0}','{1}') ";
        var sqlText = string.Format(sqltextFomat,sName,describe);
        dbhelperv2.ExecuteNonQuery(new List<string> { sqlText });
        result.Code = 200;
        result.Message = "成功！";
        result.IsTrue = true;
        return result;
  }


  public Result EditClothType(int id,string sName,string describe)
  {
         var result = new Result();
        //此处需优化，参数化处理
         var sqltextFomat = "update [clothes].[dbo].[style] set sName={0},describe={1} where id={2} ";
      var sqlText = string.Format(sqltextFomat,sName,describe,id);
        dbhelperv2.ExecuteNonQuery(new List<string> { sqlText });
        result.Code = 200;
        result.Message = "成功！";
        result.IsTrue = true;
        return result;
  }

  public Result DeleteFigureById(int id)
  {
         var result = new Result();
        //此处需优化，参数化处理
        var sqltextFomat = "delete from [clothes].[dbo].[style] where id={0} ";
        var sqlText = string.Format(sqltextFomat, id);
        dbhelperv2.ExecuteNonQuery(new List<string> { sqlText });
        result.Code = 200;
        result.Message = "成功！";
        result.IsTrue = true;
        return result;
  }




}