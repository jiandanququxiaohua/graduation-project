using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using Newtonsoft.Json;




public static  class ClothTypeHelper
{


  public Result GetInfo()
  {
        var result = new Result<ClothType>();
        //此处需优化，参数化处理
        var sqltextFomat = "select * from [clothes].[dbo].[ClothType]";
        var dt = dbhelperv2.ExecuteDataTable(string.Format(sqltextFomat, userid));
        if (dt == null || dt.Rows.Count == 0)
        {
            //Error todo  
            result.Code = 403;
            result.Message = "查无此人！";
            result.IsTrue = false;
            result.Data = new Result<ClothType>();
            return result;
        }
        var dts = dt.ToClothTypes();
        result.Code = 200;
        result.Message = "成功！";
        result.Data = dts;
        result.IsTrue = true;
        return result;
  }

public Result AddClothType(string type)
  {
         var result = new Result();
        //此处需优化，参数化处理
        var sqltextFomat = "insert into [clothes].[dbo].[ClothType] (type) values ('{0}') ";
        var sqlText = string.Format(sqltextFomat,type);
        dbhelperv2.ExecuteNonQuery(new List<string> { sqlText });
        result.Code = 200;
        result.Message = "成功！";
        result.IsTrue = true;
        return result;
  }


  public Result EditClothType(string type,int id)
  {
         var result = new Result();
        //此处需优化，参数化处理
         var sqltextFomat = "update [clothes].[dbo].[ClothType] set type={0} where id={1} ";
      var sqlText = string.Format(sqltextFomat,type,id);
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
        var sqltextFomat = "delete from [clothes].[dbo].[ClothType] where id={0} ";
        var sqlText = string.Format(sqltextFomat, id);
        dbhelperv2.ExecuteNonQuery(new List<string> { sqlText });
        result.Code = 200;
        result.Message = "成功！";
        result.IsTrue = true;
        return result;
  }




}